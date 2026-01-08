'use server';

import { query, queryOne, execute } from '@/lib/aws/database';
import { sendMessage } from '@/lib/aws/queue';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { getSettings } from './settings';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { calculateTax, generateComplianceText, PAYMENT_TERMS, type InvoiceType } from '@/lib/config/us-states';

const PDF_QUEUE_URL = process.env.PDF_QUEUE_URL;

export async function getInvoices() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const invoices = await query(
    `SELECT i.*, c.name as client_name, c.email as client_email
     FROM invoices i
     LEFT JOIN clients c ON i.client_id = c.id
     WHERE i.org_id = :orgId
     ORDER BY i.created_at DESC`,
    { orgId: org.id }
  );

  return invoices.map((inv: any) => ({
    ...inv,
    clients: {
      name: inv.client_name,
      email: inv.client_email,
    },
  }));
}

export async function getInvoice(id: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const invoice = await queryOne(
    `SELECT i.*, c.name as client_name, c.email as client_email, c.address_line1 as client_address_line1,
            c.address_line2 as client_address_line2, c.city as client_city, c.state as client_state,
            c.zip_code as client_zip_code, c.tax_id as client_tax_id
     FROM invoices i
     LEFT JOIN clients c ON i.client_id = c.id
     WHERE i.id = :id AND i.org_id = :orgId`,
    { id, orgId: org.id }
  );

  if (!invoice) return null;

  const items = await query(
    `SELECT * FROM invoice_items WHERE invoice_id = :invoiceId ORDER BY id`,
    { invoiceId: id }
  );

  return {
    ...invoice,
    clients: {
      id: invoice.client_id,
      name: invoice.client_name,
      email: invoice.client_email,
      address_line1: invoice.client_address_line1,
      address_line2: invoice.client_address_line2,
      city: invoice.client_city,
      state: invoice.client_state,
      zip_code: invoice.client_zip_code,
      tax_id: invoice.client_tax_id,
    },
    invoice_items: items,
  };
}

export async function createInvoice(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const settings = await getSettings();

  const clientId = formData.get('client_id') as string;
  const invoiceType = (formData.get('invoice_type') as InvoiceType) || 'C2C';
  const issueDate = formData.get('issue_date') as string;
  const terms = (formData.get('terms') as string) || 'Net 30';
  const consultantId = formData.get('consultant_id') as string || null;

  const termConfig = PAYMENT_TERMS.find((t) => t.value === terms);
  const dueDays = termConfig?.days || 30;
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + dueDays);

  const latestInvoice = await queryOne<{ invoice_number: string }>(
    `SELECT invoice_number FROM invoices WHERE org_id = :orgId ORDER BY created_at DESC LIMIT 1`,
    { orgId: org.id }
  );

  let nextNumber = 1;
  if (latestInvoice?.invoice_number) {
    const match = latestInvoice.invoice_number.match(/-(\d+)$/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }

  const prefix = settings?.invoice_prefix || 'INV';
  const year = new Date().getFullYear().toString().slice(-2);
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const invoiceNumber = `${prefix}-${year}${month}-${String(nextNumber).padStart(4, '0')}`;

  const client = await queryOne<{ state: string; terms: string }>(
    `SELECT state, terms FROM clients WHERE id = :id`,
    { id: clientId }
  );

  const clientState = client?.state || settings?.state || 'TX';
  const companyName = settings?.company_name || '';
  const complianceText = generateComplianceText(invoiceType, clientState, companyName);
  const taxCalc = calculateTax(0, clientState, invoiceType);

  const invoiceId = crypto.randomUUID();

  await execute(
    `INSERT INTO invoices (id, org_id, client_id, invoice_number, invoice_type, issue_date, due_date, terms, 
     subtotal, tax_rate, tax, total, status, compliance_text, consultant_id, created_at)
     VALUES (:id, :orgId, :clientId, :invoiceNumber, :invoiceType, :issueDate, :dueDate, :terms,
     0, :taxRate, 0, 0, 'draft', :complianceText, :consultantId, NOW())`,
    {
      id: invoiceId,
      orgId: org.id,
      clientId,
      invoiceNumber,
      invoiceType,
      issueDate,
      dueDate: dueDate.toISOString().split('T')[0],
      terms,
      taxRate: taxCalc.taxRate,
      complianceText,
      consultantId: consultantId && consultantId.trim() !== '' ? consultantId : null,
    }
  );

  revalidatePath('/invoices');
  redirect(`/invoices/${invoiceId}/edit`);
}

export async function updateInvoiceItems(invoiceId: string, items: any[]): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const settings = await getSettings();

  const invoice = await queryOne<{ id: string; invoice_type: string; client_id: string }>(
    `SELECT id, invoice_type, client_id FROM invoices WHERE id = :id AND org_id = :orgId`,
    { id: invoiceId, orgId: org.id }
  );

  if (!invoice) throw new Error('Invoice not found');

  const client = await queryOne<{ state: string }>(
    `SELECT state FROM clients WHERE id = :id`,
    { id: invoice.client_id }
  );

  await execute(
    `DELETE FROM invoice_items WHERE invoice_id = :invoiceId`,
    { invoiceId }
  );

  let subtotal = 0;
  for (const item of items) {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const amount = qty * rate;
    subtotal += amount;

    await execute(
      `INSERT INTO invoice_items (id, invoice_id, description, qty, rate, amount, created_at)
       VALUES (:id, :invoiceId, :description, :qty, :rate, :amount, NOW())`,
      {
        id: crypto.randomUUID(),
        invoiceId,
        description: item.description,
        qty,
        rate,
        amount,
      }
    );
  }

  const clientState = client?.state || settings?.state || 'TX';
  const invoiceType = invoice.invoice_type || 'C2C';
  const taxCalc = calculateTax(subtotal, clientState, invoiceType as InvoiceType);

  const tax = taxCalc.taxAmount;
  const total = subtotal + tax;

  await execute(
    `UPDATE invoices SET subtotal = :subtotal, tax_rate = :taxRate, tax = :tax, total = :total, 
     status = 'draft', updated_at = NOW() WHERE id = :id`,
    { id: invoiceId, subtotal, taxRate: taxCalc.taxRate, tax, total }
  );

  revalidatePath(`/invoices/${invoiceId}`);
}

export async function updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `UPDATE invoices SET status = :status, updated_at = NOW() WHERE id = :id AND org_id = :orgId`,
    { id: invoiceId, orgId: org.id, status }
  );

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath('/invoices');
}

export async function generateInvoicePDF(invoiceId: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const jobId = crypto.randomUUID();

  await execute(
    `INSERT INTO jobs (id, org_id, job_type, metadata, status, created_at)
     VALUES (:id, :orgId, 'generate_pdf', :metadata, 'queued', NOW())`,
    {
      id: jobId,
      orgId: org.id,
      metadata: JSON.stringify({ invoice_id: invoiceId }),
    }
  );

  if (PDF_QUEUE_URL) {
    await sendMessage(PDF_QUEUE_URL, {
      jobId,
      invoiceId,
      orgId: org.id,
    });
  }

  revalidatePath(`/invoices/${invoiceId}`);
  return { id: jobId };
}

export async function deleteInvoice(invoiceId: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `DELETE FROM invoice_items WHERE invoice_id = :id`,
    { id: invoiceId }
  );

  await execute(
    `DELETE FROM invoices WHERE id = :id AND org_id = :orgId`,
    { id: invoiceId, orgId: org.id }
  );

  revalidatePath('/invoices');
  redirect('/invoices');
}
