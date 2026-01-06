'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { consultantSchema } from '../validations/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getConsultants() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('consultants')
    .select('*')
    .eq('org_id', org.id)
    .order('name');

  if (error) throw new Error(error.message);
  return data;
}

export async function getConsultant(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('consultants')
    .select('*')
    .eq('id', id)
    .eq('org_id', org.id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createConsultant(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const data = consultantSchema.parse({
    name: formData.get('name'),
    defaultRate: formData.get('defaultRate'),
    unitType: formData.get('unitType') || 'hour',
    defaultDescription: formData.get('defaultDescription'),
  });

  const { error } = await supabase.from('consultants').insert({
    ...data,
    org_id: org.id,
    default_rate: data.defaultRate.toString(),
  });

  if (error) throw new Error(error.message);

  revalidatePath('/consultants');
  redirect('/consultants');
}

export async function updateConsultant(id: string, formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const data = consultantSchema.parse({
    name: formData.get('name'),
    defaultRate: formData.get('defaultRate'),
    unitType: formData.get('unitType') || 'hour',
    defaultDescription: formData.get('defaultDescription'),
  });

  const { error } = await supabase
    .from('consultants')
    .update({
      ...data,
      default_rate: data.defaultRate.toString(),
    })
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/consultants');
  redirect('/consultants');
}

export async function deleteConsultant(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { error } = await supabase
    .from('consultants')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/consultants');
  return { success: true };
}
