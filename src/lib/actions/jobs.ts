'use server';

import { createServiceClient as createSupabaseServiceClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';

export async function runRecurringJobs() {
  const supabase = await createSupabaseServiceClient();
  const org = await getUserOrganization();
  const user = await getUser();

  if (!org || !user) throw new Error('Authentication required');

  // Create job for running recurring invoices
  const { data: job, error } = await supabase
    .from('jobs')
    .insert({
      org_id: org.id,
      type: 'run_recurring',
      payload_json: {
        org_id: org.id,
        user_id: user.id,
      },
      status: 'queued',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // Create audit log
  await supabase.from('audit_log').insert({
    org_id: org.id,
    user_id: user.id,
    action: 'run_recurring_queued',
    entity_type: 'job',
    entity_id: job.id,
    metadata_json: { job_id: job.id },
  });

  return { success: true, jobId: job.id };
}

export async function getJobs() {
  const supabase = await createSupabaseServiceClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('org_id', org.id)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return data;
}
