import { SQSHandler } from "aws-lambda";
import { RDSDataClient, ExecuteStatementCommand } from "@aws-sdk/client-rds-data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import Handlebars from "handlebars";

const rds = new RDSDataClient({});
const s3 = new S3Client({});

const BUCKET_NAME = process.env.BUCKET_NAME!;
const DATABASE_ARN = process.env.DATABASE_ARN!;
const SECRET_ARN = process.env.SECRET_ARN!;

interface InvoiceJob {
  invoiceId: string;
  orgId: string;
}

const invoiceTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice {{invoice_number}}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #1e293b; }
    .invoice { max-width: 800px; margin: 0 auto; background: white; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0ea5e9 100%); color: white; padding: 40px; display: flex; justify-content: space-between; align-items: center; }
    .logo { max-height: 60px; max-width: 180px; }
    .company-info { text-align: right; }
    .company-name { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
    .company-details { font-size: 12px; opacity: 0.9; }
    .invoice-meta { padding: 30px 40px; display: flex; justify-content: space-between; background: #f1f5f9; }
    .meta-block h3 { font-size: 11px; text-transform: uppercase; color: #64748b; margin-bottom: 8px; }
    .meta-block p { font-size: 14px; font-weight: 600; color: #1e293b; }
    .invoice-number { font-size: 28px; font-weight: 800; color: #0ea5e9; }
    .bill-to { padding: 30px 40px; }
    .bill-to h3 { font-size: 11px; text-transform: uppercase; color: #64748b; margin-bottom: 12px; }
    .client-name { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
    .client-details { font-size: 13px; color: #64748b; line-height: 1.6; }
    .items-table { width: 100%; padding: 0 40px 30px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #0f172a; color: white; padding: 14px 16px; text-align: left; font-size: 12px; text-transform: uppercase; }
    th:last-child { text-align: right; }
    td { padding: 16px; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
    td:last-child { text-align: right; font-weight: 600; }
    .totals { padding: 20px 40px 40px; display: flex; justify-content: flex-end; }
    .totals-table { width: 280px; }
    .totals-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .totals-row.total { border: none; background: linear-gradient(135deg, #0f172a, #1e40af); color: white; padding: 16px; margin-top: 10px; border-radius: 8px; }
    .payment-section { padding: 30px 40px; background: #f8fafc; }
    .payment-section h3 { font-size: 14px; font-weight: 600; margin-bottom: 16px; color: #1e293b; }
    .payment-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .payment-item label { font-size: 11px; text-transform: uppercase; color: #64748b; }
    .payment-item p { font-size: 14px; font-weight: 600; margin-top: 4px; }
    .compliance { padding: 30px 40px; font-size: 11px; color: #64748b; line-height: 1.6; border-top: 1px solid #e2e8f0; }
    .footer { text-align: center; padding: 20px; background: #0f172a; color: white; font-size: 12px; }
  </style>
</head>
<body>
  <div class="invoice">
    <div class="header">
      {{#if logo_url}}<img src="{{logo_url}}" class="logo" alt="Logo">{{/if}}
      <div class="company-info">
        <div class="company-name">{{company_name}}</div>
        <div class="company-details">
          {{address_line1}}<br>
          {{address_line2}}<br>
          {{email}} | {{phone}}
        </div>
      </div>
    </div>
    <div class="invoice-meta">
      <div class="meta-block">
        <h3>Invoice Number</h3>
        <p class="invoice-number">{{invoice_number}}</p>
      </div>
      <div class="meta-block">
        <h3>Invoice Type</h3>
        <p>{{invoice_type}}</p>
      </div>
      <div class="meta-block">
        <h3>Issue Date</h3>
        <p>{{issue_date}}</p>
      </div>
      <div class="meta-block">
        <h3>Due Date</h3>
        <p>{{due_date}}</p>
      </div>
    </div>
    <div class="bill-to">
      <h3>Bill To</h3>
      <div class="client-name">{{client_name}}</div>
      <div class="client-details">
        {{client_address_line1}}<br>
        {{client_city_state_zip}}
      </div>
    </div>
    <div class="items-table">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {{#each items}}
          <tr>
            <td>{{description}}</td>
            <td>{{qty}}</td>
            <td>{{rate}}</td>
            <td>{{amount}}</td>
          </tr>
          {{/each}}
        </tbody>
      </table>
    </div>
    <div class="totals">
      <div class="totals-table">
        <div class="totals-row"><span>Subtotal</span><span>{{subtotal}}</span></div>
        <div class="totals-row"><span>Tax ({{tax_rate}}%)</span><span>{{tax}}</span></div>
        <div class="totals-row total"><span>Total Due</span><span>{{total}}</span></div>
      </div>
    </div>
    {{#if payment_instructions}}
    <div class="payment-section">
      <h3>Payment Instructions</h3>
      <div class="payment-grid">
        <div class="payment-item"><label>Payable To</label><p>{{payment_instructions.payable_to}}</p></div>
        <div class="payment-item"><label>Bank Name</label><p>{{payment_instructions.bank_name}}</p></div>
        <div class="payment-item"><label>Routing Number</label><p>{{payment_instructions.routing_number}}</p></div>
        <div class="payment-item"><label>Account Number</label><p>{{payment_instructions.account_number}}</p></div>
      </div>
    </div>
    {{/if}}
    {{#if compliance_text}}
    <div class="compliance">{{compliance_text}}</div>
    {{/if}}
    <div class="footer">Thank you for your business</div>
  </div>
</body>
</html>
`;

async function executeQuery(sql: string, parameters: any[] = []) {
  const command = new ExecuteStatementCommand({
    resourceArn: DATABASE_ARN,
    secretArn: SECRET_ARN,
    database: "relay_invoice",
    sql,
    parameters: parameters.map((p, i) => ({
      name: `p${i}`,
      value: typeof p === "string" ? { stringValue: p } : { longValue: p },
    })),
  });
  return rds.send(command);
}

export const handler: SQSHandler = async (event) => {
  for (const record of event.Records) {
    const job: InvoiceJob = JSON.parse(record.body);
    console.log(`Processing invoice ${job.invoiceId}`);

    try {
      const invoiceResult = await executeQuery(
        `SELECT i.*, c.name as client_name, c.address_line1 as client_address, 
                c.city, c.state, c.zip_code,
                s.company_name, s.address_line1, s.address_line2, s.email, s.phone,
                s.logo_url, s.payment_instructions
         FROM invoices i
         LEFT JOIN clients c ON i.client_id = c.id
         LEFT JOIN org_settings s ON i.org_id = s.org_id
         WHERE i.id = :p0`,
        [job.invoiceId]
      );

      const itemsResult = await executeQuery(
        `SELECT * FROM invoice_items WHERE invoice_id = :p0`,
        [job.invoiceId]
      );

      const invoice = invoiceResult.records?.[0];
      if (!invoice) throw new Error("Invoice not found");

      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);

      const templateData = {
        logo_url: invoice[14]?.stringValue || "",
        company_name: invoice[10]?.stringValue || "",
        address_line1: invoice[11]?.stringValue || "",
        address_line2: invoice[12]?.stringValue || "",
        email: invoice[13]?.stringValue || "",
        phone: invoice[14]?.stringValue || "",
        client_name: invoice[5]?.stringValue || "",
        client_address_line1: invoice[6]?.stringValue || "",
        client_city_state_zip: [
          invoice[7]?.stringValue,
          invoice[8]?.stringValue,
          invoice[9]?.stringValue,
        ].filter(Boolean).join(", "),
        invoice_number: invoice[1]?.stringValue || "",
        invoice_type: invoice[2]?.stringValue || "",
        issue_date: invoice[3]?.stringValue || "",
        due_date: invoice[4]?.stringValue || "",
        items: (itemsResult.records || []).map((item: any) => ({
          description: item[1]?.stringValue || "",
          qty: item[2]?.longValue || 0,
          rate: formatCurrency(item[3]?.longValue || 0),
          amount: formatCurrency(item[4]?.longValue || 0),
        })),
        subtotal: formatCurrency(invoice[16]?.longValue || 0),
        tax: formatCurrency(invoice[18]?.longValue || 0),
        tax_rate: invoice[17]?.longValue || 0,
        total: formatCurrency(invoice[19]?.longValue || 0),
        payment_instructions: invoice[15]?.stringValue
          ? JSON.parse(invoice[15].stringValue)
          : null,
        compliance_text: invoice[20]?.stringValue || "",
      };

      const template = Handlebars.compile(invoiceTemplate);
      const html = template(templateData);

      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({
        format: "Letter",
        printBackground: true,
        margin: { top: "0.4in", right: "0.5in", bottom: "0.4in", left: "0.5in" },
      });
      await browser.close();

      const fileName = `${job.orgId}/${invoice[1]?.stringValue || job.invoiceId}.pdf`;
      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: pdfBuffer,
          ContentType: "application/pdf",
        })
      );

      await executeQuery(
        `UPDATE invoices SET status = 'ready', pdf_url = :p0 WHERE id = :p1`,
        [`https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`, job.invoiceId]
      );

      console.log(`PDF generated: ${fileName}`);
    } catch (error) {
      console.error(`Failed to generate PDF for ${job.invoiceId}:`, error);
      throw error;
    }
  }
};
