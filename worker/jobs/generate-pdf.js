const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

async function generatePDF(supabase, job) {
  const invoiceId = job.metadata?.invoice_id || job.data?.invoice_id;
  console.log(`📄 Generating PDF for invoice ${invoiceId}...`);

  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (*),
      invoice_items (*)
    `)
    .eq('id', invoiceId)
    .single();

  if (invoiceError) throw new Error(`Failed to fetch invoice: ${invoiceError.message}`);

  const { data: settings, error: settingsError } = await supabase
    .from('org_settings')
    .select('*')
    .eq('org_id', invoice.org_id)
    .single();

  if (settingsError) throw new Error(`Failed to fetch settings: ${settingsError.message}`);

  console.log('✓ Invoice:', invoice.invoice_number);
  console.log('✓ Type:', invoice.invoice_type || 'C2C');

  let logoBase64 = '';
  if (settings?.logo_url) {
    try {
      console.log('→ Fetching logo from:', settings.logo_url);
      const fetchFn = typeof fetch !== 'undefined' ? fetch : (await import('node-fetch')).default;
      const logoResponse = await fetchFn(settings.logo_url);
      
      if (logoResponse.ok) {
        const logoBuffer = await logoResponse.arrayBuffer();
        const logoBytes = Buffer.from(logoBuffer);
        const mimeType = logoResponse.headers.get('content-type') || 'image/jpeg';
        logoBase64 = `data:${mimeType};base64,${logoBytes.toString('base64')}`;
        console.log('✓ Logo loaded successfully');
      }
    } catch (e) {
      console.warn('✗ Logo error:', e.message);
    }
  }

  const client = invoice.clients || {};
  let clientCityStateZip = '';
  const cityStateZipParts = [];
  if (client.city) cityStateZipParts.push(client.city);
  if (client.state) cityStateZipParts.push(client.state);
  if (client.zip_code) cityStateZipParts.push(client.zip_code);
  if (cityStateZipParts.length > 0) {
    clientCityStateZip = cityStateZipParts.join(', ');
  }

  const invoiceTypeLabels = {
    'C2C': 'Corp-to-Corp (C2C)',
    'W2': 'W-2 Employee',
    '1099': '1099 Contractor'
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  let paymentInstructions = null;
  if (settings?.payment_instructions) {
    const pi = typeof settings.payment_instructions === 'string' 
      ? JSON.parse(settings.payment_instructions) 
      : settings.payment_instructions;
    
    if (pi && (pi.payable_to || pi.bank_name || pi.routing_number || pi.account_number)) {
      paymentInstructions = {
        payable_to: pi.payable_to || '',
        bank_name: pi.bank_name || '',
        routing_number: pi.routing_number || '',
        account_number: pi.account_number || '',
      };
    }
  }

  const templateData = {
    logo_url: logoBase64 || '',
    company_name: settings?.company_name || '',
    address_line1: settings?.address_line1 || '',
    address_line2: settings?.address_line2 || '',
    email: settings?.email || '',
    phone: settings?.phone || '',
    client_name: client.name || '',
    client_address_line1: client.address_line1 || '',
    client_address_line2: client.address_line2 || '',
    client_city_state_zip: clientCityStateZip,
    invoice_number: invoice.invoice_number || '',
    invoice_type: invoiceTypeLabels[invoice.invoice_type] || invoice.invoice_type || '',
    issue_date: invoice.issue_date ? new Date(invoice.issue_date).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }) : '',
    due_date: invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }) : '',
    terms: invoice.terms || 'Net 30',
    items: (invoice.invoice_items || []).map(item => ({
      description: item.description || '',
      qty: (item.qty || 0).toFixed(2),
      rate: formatCurrency(item.rate),
      amount: formatCurrency(item.amount),
    })),
    subtotal: formatCurrency(invoice.subtotal),
    tax: formatCurrency(invoice.tax),
    tax_rate: invoice.tax_rate || 0,
    total: formatCurrency(invoice.total),
    payment_instructions: paymentInstructions,
    compliance_text: invoice.compliance_text || settings?.compliance_text || '',
    footer_note: (settings?.footer_note || '').replace('{invoice_number}', invoice.invoice_number || ''),
  };

  const templatePath = path.join(__dirname, '../templates/invoice.html');
  const templateSource = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);
  const html = template(templateData);

  const debugHtmlPath = `/tmp/invoice-${invoice.invoice_number}-debug.html`;
  await fs.writeFile(debugHtmlPath, html);
  console.log('✓ Debug HTML saved to:', debugHtmlPath);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || '/nix/store/qa9cnw4v5xkxyip6mb9kxqfq1z4x2dx1-chromium-138.0.7204.100/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  
  await page.setContent(html, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const pdfBuffer = await page.pdf({
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '0.4in',
      right: '0.5in',
      bottom: '0.4in',
      left: '0.5in'
    }
  });
  
  await browser.close();
  console.log('✓ PDF generated:', pdfBuffer.length, 'bytes');

  const fileName = `${invoice.org_id}/${invoice.invoice_number}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) throw new Error(`Failed to upload PDF: ${uploadError.message}`);

  const { data: { publicUrl } } = supabase.storage
    .from('invoices')
    .getPublicUrl(fileName);

  await supabase
    .from('invoices')
    .update({ status: 'ready' })
    .eq('id', invoice.id);

  console.log(`✅ PDF ready: ${publicUrl}`);
  return { pdf_url: publicUrl };
}

module.exports = { generatePDF };
