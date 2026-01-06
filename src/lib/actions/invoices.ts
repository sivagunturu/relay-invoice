'use server';

import { createClient as createSupabaseClient, createServiceClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { calculateDueDate } from '../utils';

export async function getInvoices() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      clients (id, name)
    `)
    .eq('org_id', org.id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function getInvoice(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

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

  if (error) throw new Error(error.message);
  return data;
}

export async function createInvoiceFromTemplate(templateId: string, month: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();
  const user = await getUser();

  if (!org || !user) throw new Error('Authentication required');

  // Get template with items
  const { data: template } = await supabase
    .from('invoice_templates')
    .select(`
      *,
      clients (*),
      invoice_template_items (*)
    `)
    .eq('id', templateId)
    .eq('org_id', org.id)
    .single();

  if (!template) throw new Error('Template not found');

  // Get org settings for invoice numbering
  const { data: settings } = await supabase
    .from('org_settings')
    .select('*')
    .eq('org_id', org.id)
    .single();

  if (!settings) throw new Error('Settings not found');

  // Generate invoice number using database function
  const { data: invoiceNumberResult } = await supabase
    .rpc('generate_invoice_number', {
      p_org_id: org.id,
      p_month: month,
    });

  const invoiceNumber = invoiceNumberResult as string;

  // Calculate dates
  const issueDate = new Date();
  const dueDate = calculateDueDate(issueDate, settings.default_terms);

  // Create invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      org_id: org.id,
      client_id: template.client_id,
      template_id: templateId,
      invoice_number: invoiceNumber,
      issue_date: issueDate.toISOString().split('T')[0],
      due_date: dueDate.toISOString().split('T')[0],
      month,
      status: 'draft',
      terms: settings.default_terms,
      currency: settings.default_currency,
      payment_instructions: settings.payment_instructions,
      compliance_text: settings.compliance_text,
    })
    .select()
    .single();

  if (invoiceError) throw new Error(invoiceError.message);

  // Create invoice items from template
  if (template.invoice_template_items && template.invoice_template_items.length > 0) {
    const items = template.invoice_template_items.map((item: any, index: number) => ({
      org_id: org.id,
      invoice_id: invoice.id,
      description: item.description,
      qty: item.qty_default,
      rate: item.rate_default,
      amount: parseFloat(item.qty_default) * parseFloat(item.rate_default),
      sort_order: index,
    }));

    await supabase.from('invoice_items').insert(items);
  }

  revalidatePath('/invoices');
  redirect(`/invoices/${invoice.id}/edit`);
}

export async function createInvoice(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const clientId = formData.get('clientId') as string;
  const issueDate = formData.get('issueDate') as string;
  const month = formData.get('month') as string;
  const terms = formData.get('terms') as string;
  const currency = formData.get('currency') as string;

  // Get org settings
  const { data: settings } = await supabase
    .from('org_settings')
    .select('*')
    .eq('org_id', org.id)
    .single();

  if (!settings) throw new Error('Settings not found');

  // Generate invoice number
  const { data: invoiceNumberResult } = await supabase
    .rpc('generate_invoice_number', {
      p_org_id: org.id,
      p_month: month,
    });

  const invoiceNumber = invoiceNumberResult as string;

  const dueDate = calculateDueDate(new Date(issueDate), terms);

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      org_id: org.id,
      client_id: clientId,
      invoice_number: invoiceNumber,
      issue_date: issueDate,
      due_date: dueDate.toISOString().split('T')[0],
      month,
      status: 'draft',
      terms,
      currency,
      payment_instructions: settings.payment_instructions,
      compliance_text: settings.compliance_text,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath('/invoices');
  redirect(`/invoices/${invoice.id}/edit`);
}

export async function updateInvoiceItems(invoiceId: string, itemsJson: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const items = JSON.parse(itemsJson);

  // Calculate totals
  let subtotal = 0;
  items.forEach((item: any) => {
    subtotal += parseFloat(item.qty) * parseFloat(item.rate);
  });

  const tax = 0; // Phase 1: no tax
  const total = subtotal + tax;

  // Delete existing items
  await supabase
    .from('invoice_items')
    .delete()
    .eq('invoice_id', invoiceId);

  // Insert new items
  const itemsToInsert = items.map((item: any, index: number) => ({
    org_id: org.id,
    invoice_id: invoiceId,
    description: item.description,
    qty: item.qty,
    rate: item.rate,
    amount: parseFloat(item.qty) * parseFloat(item.rate),
    sort_order: index,
  }));

  await supabase.from('invoice_items').insert(itemsToInsert);

  // Update invoice totals
  await supabase
    .from('invoices')
    .update({
      subtotal: subtotal.toString(),
      tax: tax.toString(),
      total: total.toString(),
    })
    .eq('id', invoiceId)
    .eq('org_id', org.id);

  revalidatePath(`/invoices/${invoiceId}`);
  return { success: true };
}

export async function generateInvoicePDF(invoiceId: string) {
  const supabase = await createServiceClient();
  const org = await getUserOrganization();
  const user = await getUser();

  if (!org || !user) throw new Error('Authentication required');

  // Create job for PDF generation (using correct column names)
  const { data: job, error } = await supabase
    .from('jobs')
    .insert({
      org_id: org.id,
      job_type: 'generate_pdf',  // Changed from 'type'
      metadata: {                  // Changed from 'payload_json'
        invoice_id: invoiceId,
        user_id: user.id,
      },
      status: 'queued',
      attempts: 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Create audit log
  await supabase.from('audit_log').insert({
    org_id: org.id,
    user_id: user.id,
    action: 'generate_pdf_queued',
    entity_type: 'invoice',
    entity_id: invoiceId,
    metadata: { job_id: job.id },
  });

  return { success: true, jobId: job.id };
}

export async function deleteInvoice(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { error } = await supabase
    .from('invoices')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/invoices');
  return { success: true };
}
