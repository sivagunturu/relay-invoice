'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

export async function createInvoice(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const clientId = formData.get('client_id') as string;
  const issueDate = formData.get('issue_date') as string;
  const dueDate = formData.get('due_date') as string;
  const terms = formData.get('terms') as string;

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

  const invoiceNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(nextNumber).padStart(4, '0')}`;

  const { data: invoice, error } = await supabase
    .from('invoices')
    .insert({
      org_id: org.id,
      client_id: clientId,
      invoice_number: invoiceNumber,
      issue_date: issueDate,
      due_date: dueDate,
      terms: terms,
      subtotal: 0,
      tax: 0,
      total: 0,
      status: 'draft',
    })
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

  const { data: invoice } = await supabase
    .from('invoices')
    .select('id')
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
    const amount = parseFloat(item.qty) * parseFloat(item.rate);
    subtotal += amount;

    await supabase
      .from('invoice_items')
      .insert({
        invoice_id: invoiceId,
        description: item.description,
        qty: parseFloat(item.qty),
        rate: parseFloat(item.rate),
        amount: amount,
      });
  }

  const tax = 0;
  const total = subtotal + tax;

  await supabase
    .from('invoices')
    .update({
      subtotal,
      tax,
      total,
      status: 'draft',
    })
    .eq('id', invoiceId);

  revalidatePath(`/invoices/${invoiceId}`);
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
      type: 'generate_pdf',
      data: { invoice_id: invoiceId },
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
