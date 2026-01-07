'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getTemplates() {
  const user = await getUser();
  if (!user) return [];
  
  const org = await getUserOrganization();
  if (!org) return [];
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('invoice_templates')
    .select('*')
    .eq('org_id', org.id)
    .order('name');

  if (error) return [];
  return data || [];
}

export async function createTemplate(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('invoice_templates')
    .insert({
      org_id: org.id,
      name: formData.get('name') as string,
      template_html: formData.get('template_html') as string,
    });

  if (error) throw error;

  revalidatePath('/templates');
  redirect('/templates');
}

export async function updateTemplate(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('invoice_templates')
    .update({
      name: formData.get('name') as string,
      template_html: formData.get('template_html') as string,
    })
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/templates');
  redirect('/templates');
}

export async function deleteTemplate(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');
  
  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');
  
  const supabase = await createClient();

  const { error } = await supabase
    .from('invoice_templates')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw error;

  revalidatePath('/templates');
  redirect('/templates');
}
