'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { clientSchema } from '../validations/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) {
    throw new Error('No organization found');
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('org_id', org.id)
    .order('name');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getClient(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) {
    throw new Error('No organization found');
  }

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('org_id', org.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createClient(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) {
    throw new Error('No organization found');
  }

  const data = clientSchema.parse({
    name: formData.get('name'),
    addressLine1: formData.get('addressLine1'),
    addressLine2: formData.get('addressLine2'),
    addressLine3: formData.get('addressLine3'),
    email: formData.get('email'),
    terms: formData.get('terms'),
    currency: formData.get('currency'),
  });

  const { error } = await supabase
    .from('clients')
    .insert({
      ...data,
      org_id: org.id,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/clients');
  redirect('/clients');
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) {
    throw new Error('No organization found');
  }

  const data = clientSchema.parse({
    name: formData.get('name'),
    addressLine1: formData.get('addressLine1'),
    addressLine2: formData.get('addressLine2'),
    addressLine3: formData.get('addressLine3'),
    email: formData.get('email'),
    terms: formData.get('terms'),
    currency: formData.get('currency'),
  });

  const { error } = await supabase
    .from('clients')
    .update(data)
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/clients');
  redirect('/clients');
}

export async function deleteClient(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) {
    throw new Error('No organization found');
  }

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/clients');
  return { success: true };
}
