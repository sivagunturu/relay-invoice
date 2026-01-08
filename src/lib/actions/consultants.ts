'use server';

import { query, queryOne, execute } from '@/lib/aws/database';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getConsultants() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const consultants = await query(
    `SELECT * FROM consultants WHERE org_id = :orgId ORDER BY name`,
    { orgId: org.id }
  );

  return consultants || [];
}

export async function getConsultant(id: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const consultant = await queryOne(
    `SELECT * FROM consultants WHERE id = :id AND org_id = :orgId`,
    { id, orgId: org.id }
  );

  return consultant;
}

export async function createConsultant(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const id = crypto.randomUUID();

  await execute(
    `INSERT INTO consultants (id, org_id, name, email, created_at)
     VALUES (:id, :orgId, :name, :email, NOW())`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }
  );

  revalidatePath('/consultants');
  redirect('/consultants');
}

export async function updateConsultant(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `UPDATE consultants SET name = :name, email = :email, updated_at = NOW()
     WHERE id = :id AND org_id = :orgId`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }
  );

  revalidatePath('/consultants');
  redirect('/consultants');
}

export async function deleteConsultant(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `DELETE FROM consultants WHERE id = :id AND org_id = :orgId`,
    { id, orgId: org.id }
  );

  revalidatePath('/consultants');
  redirect('/consultants');
}
