'use server';

import { query, queryOne, execute } from '@/lib/aws/database';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getTemplates() {
  const user = await getUser();
  if (!user) return [];

  const org = await getUserOrganization();
  if (!org) return [];

  const templates = await query(
    `SELECT * FROM invoice_templates WHERE org_id = :orgId ORDER BY name`,
    { orgId: org.id }
  );

  return templates || [];
}

export async function createTemplate(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const id = crypto.randomUUID();

  await execute(
    `INSERT INTO invoice_templates (id, org_id, name, template_html, created_at)
     VALUES (:id, :orgId, :name, :template_html, NOW())`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      template_html: formData.get('template_html') as string,
    }
  );

  revalidatePath('/templates');
  redirect('/templates');
}

export async function updateTemplate(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `UPDATE invoice_templates SET name = :name, template_html = :template_html, updated_at = NOW()
     WHERE id = :id AND org_id = :orgId`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      template_html: formData.get('template_html') as string,
    }
  );

  revalidatePath('/templates');
  redirect('/templates');
}

export async function deleteTemplate(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `DELETE FROM invoice_templates WHERE id = :id AND org_id = :orgId`,
    { id, orgId: org.id }
  );

  revalidatePath('/templates');
  redirect('/templates');
}
