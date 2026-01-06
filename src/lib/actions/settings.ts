'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { settingsSchema } from '../validations/schemas';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('org_settings')
    .select('*')
    .eq('org_id', org.id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateSettings(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const paymentInstructions = {
    payable_to: formData.get('payable_to') as string,
    bank_name: formData.get('bank_name') as string,
    routing_number: formData.get('routing_number') as string,
    account_number: formData.get('account_number') as string,
  };

  const { error } = await supabase
    .from('org_settings')
    .update({
      company_name: formData.get('companyName') as string,
      address_line1: formData.get('addressLine1') as string,
      address_line2: formData.get('addressLine2') as string,
      address_line3: formData.get('addressLine3') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      default_terms: formData.get('defaultTerms') as string,
      default_currency: formData.get('defaultCurrency') as string,
      invoice_prefix: formData.get('invoicePrefix') as string,
      footer_note: formData.get('footerNote') as string,
      payment_instructions: paymentInstructions,
      compliance_text: formData.get('complianceText') as string,
    })
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/settings');
  return { success: true };
}
