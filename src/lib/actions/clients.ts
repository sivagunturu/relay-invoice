'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients() {
  const user = await getUser();
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
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
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
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
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('clients')
    .insert({
      org_id: org.id,
      name: formData.get('name') as string,
      address_line1: formData.get('address_line1') as string,
      address_line2: formData.get('address_line2') as string,
    });

  if (error) throw error;

  revalidatePath('/clients');
  redirect('/clients');
}

export async function updateClient(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('clients')
    .update({
      name: formData.get('name') as string,
      address_line1: formData.get('address_line1') as string,
      address_line2: formData.get('address_line2') as string,
    })
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/clients');
  redirect('/clients');
}

export async function deleteClient(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
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
