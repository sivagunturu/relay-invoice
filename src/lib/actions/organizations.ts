'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUser } from './auth';

export async function getUserOrganization() {
  const supabase = await createSupabaseClient();
  const user = await getUser();

  if (!user) {
    console.log('No user found');
    return null;
  }

  console.log('Fetching org for user:', user.id);

  // Step 1: Get the org_member record
  const { data: membership, error: memberError } = await supabase
    .from('org_members')
    .select('id, role, status, org_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (memberError || !membership) {
    console.error('Error fetching membership:', memberError);
    return null;
  }

  console.log('Found membership:', membership);

  // Step 2: Get the organization
  const { data: org, error: orgError } = await supabase
    .from('organizations')
    .select('id, name, created_at')
    .eq('id', membership.org_id)
    .single();

  if (orgError || !org) {
    console.error('Error fetching organization:', orgError);
    return null;
  }

  console.log('Found organization:', org);

  return {
    id: org.id,
    name: org.name,
    role: membership.role,
  };
}
