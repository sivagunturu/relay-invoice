'use server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from './auth';
import { redirect } from 'next/navigation';

export async function getUserOrganization() {
  const user = await getUser();
  if (!user) return null;
  
  const supabase = await createClient();

  const { data: membership } = await supabase
    .from('org_members')
    .select('org_id, organizations(*)')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (!membership?.organizations) return null;
  
  return membership.organizations as any;
}
