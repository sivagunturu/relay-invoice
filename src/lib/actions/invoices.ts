'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function generateInvoicePDF(invoiceId: string) {
  const user = await getUser();
  const org = await getUserOrganization(user.id);
  const supabase = await createClient();

  // Create job
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

export async function deleteInvoice(invoiceId: string) {
  const user = await getUser();
  const org = await getUserOrganization(user.id);
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
