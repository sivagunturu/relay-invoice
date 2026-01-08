'use server';

import { query } from '@/lib/aws/database';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';

export async function getJobs() {
  const user = await getUser();
  if (!user) return [];

  const org = await getUserOrganization();
  if (!org) return [];

  const jobs = await query(
    `SELECT * FROM jobs WHERE org_id = :orgId ORDER BY created_at DESC`,
    { orgId: org.id }
  );

  return jobs || [];
}
