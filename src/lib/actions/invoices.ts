'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { getSettings } from './settings';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { calculateTax, generateComplianceText, PAYMENT_TERMS, type InvoiceType } from '@/lib/config/us-states';

export async function getInvoices() {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (*)
    `)
    .eq('org_id', org.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getInvoice(id: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (*),
      invoice_items (*)
    `)
    .eq('id', id)
    .eq('org_id', org.id)
    .single();

  if (error) throw error;
  return data;
}

export async function createInvoice(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();
  const settings = await getSettings();

  const clientId = formData.get('client_id') as string;
  const invoiceType = (formData.get('invoice_type') as InvoiceType) || 'C2C';
  const issueDate = formData.get('issue_date') as string;
  const terms = formData.get('terms') as string || 'Net 30';
  const consultantId = formData.get('consultant_id') as string || null;

  const termConfig = PAYMENT_TERMS.find(t => t.value === terms);
  const dueDays = termConfig?.days || 30;
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + dueDays);

  const { data: latestInvoice } = await supabase
    .from('invoices')
    .select('invoice_number')
    .eq('org_id', org.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

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

  const { data: client } = await supabase
    .from('clients')
    .select('state, terms')
    .eq('id', clientId)
    .single();

  const clientState = client?.state || settings?.state || 'TX';
  const companyName = settings?.company_name || '';
  const complianceText = generateComplianceText(invoiceType, clientState, companyName);
  const taxCalc = calculateTax(0, clientState, invoiceType);

  const invoiceData: Record<string, any> = {
    org_id: org.id,
    client_id: clientId,
    invoice_number: invoiceNumber,
    invoice_type: invoiceType,
    issue_date: issueDate,
    due_date: dueDate.toISOString().split('T')[0],
    terms: terms,
    subtotal: 0,
    tax_rate: taxCalc.taxRate,
    tax: 0,
    total: 0,
    status: 'draft',
    compliance_text: complianceText,
  };

  if (consultantId && consultantId.trim() !== '') {
    invoiceData.consultant_id = consultantId;
  }

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert(invoiceData)
    .select()
    .single();

  if (error) throw error;

  revalidatePath('/invoices');
  redirect(`/invoices/${invoice.id}/edit`);
}

export async function updateInvoiceItems(invoiceId: string, items: any[]): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();
  const settings = await getSettings();

  const { data: invoice } = await supabase
    .from('invoices')
    .select('id, invoice_type, clients(state)')
    .eq('id', invoiceId)
    .eq('org_id', org.id)
    .single();

  if (!invoice) throw new Error('Invoice not found');

  await supabase
    .from('invoice_items')
    .delete()
    .eq('invoice_id', invoiceId);

  let subtotal = 0;
  for (const item of items) {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const amount = qty * rate;
    subtotal += amount;

    await supabase
      .from('invoice_items')
      .insert({
        invoice_id: invoiceId,
        description: item.description,
        qty: qty,
        rate: rate,
        amount: amount,
      });
  }

  const clientState = (invoice as any).clients?.state || settings?.state || 'TX';
  const invoiceType = invoice.invoice_type || 'C2C';
  const taxCalc = calculateTax(subtotal, clientState, invoiceType as InvoiceType);
  
  const tax = taxCalc.taxAmount;
  const total = subtotal + tax;

  await supabase
    .from('invoices')
    .update({
      subtotal,
      tax_rate: taxCalc.taxRate,
      tax,
      total,
      status: 'draft',
    })
    .eq('id', invoiceId);

  revalidatePath(`/invoices/${invoiceId}`);
}

export async function updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('invoices')
    .update({ status })
    .eq('id', invoiceId)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath(`/invoices/${invoiceId}`);
  revalidatePath('/invoices');
}

export async function generateInvoicePDF(invoiceId: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { data: job, error } = await supabase
    .from('jobs')
    .insert({
      org_id: org.id,
      job_type: 'generate_pdf',
      metadata: { invoice_id: invoiceId },
      status: 'queued',
    })
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/invoices/${invoiceId}`);
  return job;
}

export async function deleteInvoice(invoiceId: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', invoiceId)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/invoices');
  redirect('/invoices');
}
