'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getConsultants() {
  const user = await getUser();
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('consultants')
    .select('*')
    .eq('org_id', org.id)
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function createConsultant(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('consultants')
    .insert({
      org_id: org.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });

  if (error) throw error;

  revalidatePath('/consultants');
  redirect('/consultants');
}
