const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs').promises;
const path = require('path');

async function generatePDF(supabase, job) {
  console.log(`📄 Generating PDF for invoice ${job.metadata.invoice_id}...`);

  // 1. Fetch invoice data
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (*),
      invoice_items (*)
    `)
    .eq('id', job.metadata.invoice_id)
    .single();

  if (invoiceError) throw new Error(`Failed to fetch invoice: ${invoiceError.message}`);

  // 2. Fetch org settings
  const { data: settings, error: settingsError } = await supabase
    .from('org_settings')
    .select('*')
    .eq('org_id', invoice.org_id)
    .single();

  if (settingsError) throw new Error(`Failed to fetch settings: ${settingsError.message}`);

  console.log('✓ Invoice:', invoice.invoice_number);

  // 3. Download logo and convert to base64
  let logoBase64 = '';
  if (settings.logo_url) {
    try {
      console.log('→ Fetching logo from:', settings.logo_url);
      const logoResponse = await fetch(settings.logo_url);
      
      if (logoResponse.ok) {
        const logoBuffer = await logoResponse.arrayBuffer();
        const logoBytes = Buffer.from(logoBuffer);
        const mimeType = logoResponse.headers.get('content-type') || 'image/jpeg';
        logoBase64 = `data:${mimeType};base64,${logoBytes.toString('base64')}`;
        console.log('✓ Logo base64 length:', logoBase64.length);
        console.log('✓ Logo starts with:', logoBase64.substring(0, 50));
      }
    } catch (e) {
      console.warn('✗ Logo error:', e.message);
    }
  }

  // 4. Format data for template
  const templateData = {
    logo_url: logoBase64,
    company_name: settings.company_name,
    address_line1: settings.address_line1,
    address_line2: settings.address_line2,
    email: settings.email,
    phone: settings.phone,
    client_name: invoice.clients.name,
    client_address_line1: invoice.clients.address_line1,
    client_address_line2: invoice.clients.address_line2,
    invoice_number: invoice.invoice_number,
    issue_date: new Date(invoice.issue_date).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }),
    due_date: new Date(invoice.due_date).toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric' 
    }),
    terms: invoice.terms,
    items: invoice.invoice_items.map(item => ({
      description: item.description,
      qty: item.qty.toFixed(2),
      rate: `$${item.rate.toFixed(2)}`,
      amount: `$${item.amount.toFixed(2)}`,
    })),
    subtotal: `$${invoice.subtotal.toFixed(2)}`,
    tax: `$${invoice.tax.toFixed(2)}`,
    total: `$${invoice.total.toFixed(2)}`,
    payment_instructions: invoice.payment_instructions,
    compliance_text: invoice.compliance_text,
    footer_note: settings.footer_note?.replace('{invoice_number}', invoice.invoice_number),
  };

  // 5. Load and compile template
  const templatePath = path.join(__dirname, '../templates/invoice.html');
  const templateSource = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);
  const html = template(templateData);

  // SAVE HTML FOR DEBUGGING
  const debugHtmlPath = `/tmp/invoice-${invoice.invoice_number}-debug.html`;
  await fs.writeFile(debugHtmlPath, html);
  console.log('✓ Debug HTML saved to:', debugHtmlPath);
  console.log('✓ HTML contains logo tag:', html.includes('<img src="data:image'));

  // 6. Generate PDF with Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  
  await page.setContent(html, {
    waitUntil: ['load', 'domcontentloaded', 'networkidle0']
  });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  
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

  // 7. Upload PDF to storage
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

  // 8. Upsert invoice version
  await supabase
    .from('invoice_versions')
    .upsert({
      org_id: invoice.org_id,
      invoice_id: invoice.id,
      version: 1,
      snapshot_json: {
        invoice_number: invoice.invoice_number,
        client: invoice.clients.name,
        total: invoice.total,
      },
      pdf_file_id: null,
    }, {
      onConflict: 'invoice_id,version'
    });

  // 9. Update invoice status
  await supabase
    .from('invoices')
    .update({ status: 'ready' })
    .eq('id', invoice.id);

  console.log(`✅ ${publicUrl}`);
  return { pdf_url: publicUrl };
}

module.exports = { generatePDF };
