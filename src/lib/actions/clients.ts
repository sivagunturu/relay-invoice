'use server';

import { query, queryOne, execute } from '@/lib/aws/database';
import { getUserOrganization } from './organizations';
import { getUser } from './auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const clients = await query(
    `SELECT * FROM clients WHERE org_id = :orgId ORDER BY name`,
    { orgId: org.id }
  );

  return clients || [];
}

export async function getClient(id: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const client = await queryOne(
    `SELECT * FROM clients WHERE id = :id AND org_id = :orgId`,
    { id, orgId: org.id }
  );

  return client;
}

export async function addClient(formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  const id = crypto.randomUUID();

  await execute(
    `INSERT INTO clients (id, org_id, name, email, phone, address_line1, address_line2, city, state, zip_code, tax_id, terms, created_at)
     VALUES (:id, :orgId, :name, :email, :phone, :address_line1, :address_line2, :city, :state, :zip_code, :tax_id, :terms, NOW())`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      email: (formData.get('email') as string) || null,
      phone: (formData.get('phone') as string) || null,
      address_line1: formData.get('address_line1') as string,
      address_line2: (formData.get('address_line2') as string) || null,
      city: (formData.get('city') as string) || null,
      state: (formData.get('state') as string) || null,
      zip_code: (formData.get('zip_code') as string) || null,
      tax_id: (formData.get('tax_id') as string) || null,
      terms: (formData.get('terms') as string) || 'Net 30',
    }
  );

  revalidatePath('/clients');
  redirect('/clients');
}

export async function updateClient(id: string, formData: FormData): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `UPDATE clients SET
       name = :name,
       email = :email,
       phone = :phone,
       address_line1 = :address_line1,
       address_line2 = :address_line2,
       city = :city,
       state = :state,
       zip_code = :zip_code,
       tax_id = :tax_id,
       terms = :terms,
       updated_at = NOW()
     WHERE id = :id AND org_id = :orgId`,
    {
      id,
      orgId: org.id,
      name: formData.get('name') as string,
      email: (formData.get('email') as string) || null,
      phone: (formData.get('phone') as string) || null,
      address_line1: formData.get('address_line1') as string,
      address_line2: (formData.get('address_line2') as string) || null,
      city: (formData.get('city') as string) || null,
      state: (formData.get('state') as string) || null,
      zip_code: (formData.get('zip_code') as string) || null,
      tax_id: (formData.get('tax_id') as string) || null,
      terms: (formData.get('terms') as string) || 'Net 30',
    }
  );

  revalidatePath('/clients');
  redirect('/clients');
}

export async function deleteClient(id: string): Promise<void> {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const org = await getUserOrganization();
  if (!org) redirect('/auth/login');

  await execute(
    `DELETE FROM clients WHERE id = :id AND org_id = :orgId`,
    { id, orgId: org.id }
  );

  revalidatePath('/clients');
  redirect('/clients');
}
