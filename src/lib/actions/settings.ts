'use server';

import { query, queryOne, execute } from '@/lib/aws/database';
import { getUserOrganization } from './organizations';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const org = await getUserOrganization();
  if (!org) throw new Error('No organization found');

  const settings = await queryOne(
    `SELECT * FROM org_settings WHERE org_id = :orgId`,
    { orgId: org.id }
  );

  return settings;
}

export async function updateSettings(formData: FormData) {
  const org = await getUserOrganization();
  if (!org) throw new Error('No organization found');

  const paymentInstructions = JSON.stringify({
    payable_to: formData.get('payable_to') as string,
    bank_name: formData.get('bank_name') as string,
    routing_number: formData.get('routing_number') as string,
    account_number: formData.get('account_number') as string,
  });

  await execute(
    `UPDATE org_settings SET
       company_name = :company_name,
       address_line1 = :address_line1,
       address_line2 = :address_line2,
       address_line3 = :address_line3,
       email = :email,
       phone = :phone,
       default_terms = :default_terms,
       default_currency = :default_currency,
       invoice_prefix = :invoice_prefix,
       footer_note = :footer_note,
       payment_instructions = :payment_instructions,
       compliance_text = :compliance_text,
       updated_at = NOW()
     WHERE org_id = :orgId`,
    {
      orgId: org.id,
      company_name: formData.get('companyName') as string,
      address_line1: formData.get('addressLine1') as string,
      address_line2: (formData.get('addressLine2') as string) || null,
      address_line3: (formData.get('addressLine3') as string) || null,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || null,
      default_terms: formData.get('defaultTerms') as string,
      default_currency: formData.get('defaultCurrency') as string,
      invoice_prefix: formData.get('invoicePrefix') as string,
      footer_note: (formData.get('footerNote') as string) || null,
      payment_instructions: paymentInstructions,
      compliance_text: (formData.get('complianceText') as string) || null,
    }
  );

  revalidatePath('/settings');
  return { success: true };
}
