'use server';

import { createClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';

export async function getJobs() {
  const user = await getUser();
  if (!user) return [];
  
  const org = await getUserOrganization();
  if (!org) return [];
  
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('org_id', org.id)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}
