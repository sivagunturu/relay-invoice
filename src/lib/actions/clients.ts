'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients() {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('org_id', org.id)
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getClient(id: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('org_id', org.id)
    .single();

  if (error) throw error;
  return data;
}

export async function addClient(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('clients')
    .insert({
      org_id: org.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      address_line1: formData.get('address_line1') as string,
      address_line2: formData.get('address_line2') as string || null,
      city: formData.get('city') as string || null,
      state: formData.get('state') as string || null,
      zip_code: formData.get('zip_code') as string || null,
      tax_id: formData.get('tax_id') as string || null,
      terms: formData.get('terms') as string || 'Net 30',
    });

  if (error) throw error;

  revalidatePath('/clients');
  redirect('/clients');
}

export async function updateClient(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('clients')
    .update({
      name: formData.get('name') as string,
      email: formData.get('email') as string || null,
      phone: formData.get('phone') as string || null,
      address_line1: formData.get('address_line1') as string,
      address_line2: formData.get('address_line2') as string || null,
      city: formData.get('city') as string || null,
      state: formData.get('state') as string || null,
      zip_code: formData.get('zip_code') as string || null,
      tax_id: formData.get('tax_id') as string || null,
      terms: formData.get('terms') as string || 'Net 30',
    })
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/clients');
  redirect('/clients');
}

export async function deleteClient(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/clients');
  redirect('/clients');
}
