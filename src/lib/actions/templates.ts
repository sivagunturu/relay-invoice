'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';

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
