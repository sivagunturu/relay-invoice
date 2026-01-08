'use server';

import { query, queryOne } from '@/lib/aws/database';
import { getUser } from './auth';

export async function getUserOrganization() {
  const user = await getUser();
  if (!user) return null;

  const membership = await queryOne<{
    org_id: string;
    role: string;
    status: string;
  }>(
    `SELECT org_id, role, status FROM org_members 
     WHERE user_id = :userId AND status = 'active'`,
    { userId: user.sub }
  );

  if (!membership) return null;

  const org = await queryOne<{
    id: string;
    name: string;
    created_at: string;
  }>(
    `SELECT id, name, created_at FROM organizations WHERE id = :id`,
    { id: membership.org_id }
  );

  return org;
}

export async function createOrganization(name: string, userId: string): Promise<string> {
  const orgId = crypto.randomUUID();
  
  await query(
    `INSERT INTO organizations (id, name, created_at) 
     VALUES (:id, :name, NOW())`,
    { id: orgId, name }
  );

  await query(
    `INSERT INTO org_members (id, org_id, user_id, role, status, created_at)
     VALUES (:id, :org_id, :user_id, 'owner', 'active', NOW())`,
    { id: crypto.randomUUID(), org_id: orgId, user_id: userId }
  );

  await query(
    `INSERT INTO org_settings (id, org_id, created_at)
     VALUES (:id, :org_id, NOW())`,
    { id: crypto.randomUUID(), org_id: orgId }
  );

  return orgId;
}
