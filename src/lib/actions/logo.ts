'use server';

import { execute, queryOne } from '@/lib/aws/database';
import { uploadFile, deleteFile, getSignedDownloadUrl } from '@/lib/aws/storage';
import { getUserOrganization } from './organizations';
import { revalidatePath } from 'next/cache';

export async function uploadLogo(formData: FormData) {
  const org = await getUserOrganization();
  if (!org) throw new Error('No organization found');

  const file = formData.get('logo') as File;
  if (!file) throw new Error('No file provided');

  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error('File size must be less than 2MB');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${org.id}/logo.${fileExt}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await uploadFile('logos', fileName, buffer, file.type);

  const logoUrl = await getSignedDownloadUrl('logos', fileName, 86400 * 365);

  await execute(
    `UPDATE org_settings SET logo_url = :logoUrl, updated_at = NOW() WHERE org_id = :orgId`,
    { orgId: org.id, logoUrl: fileName }
  );

  revalidatePath('/settings');
  return { success: true, logoUrl };
}

export async function deleteLogo() {
  const org = await getUserOrganization();
  if (!org) throw new Error('No organization found');

  const settings = await queryOne<{ logo_url: string | null }>(
    `SELECT logo_url FROM org_settings WHERE org_id = :orgId`,
    { orgId: org.id }
  );

  if (settings?.logo_url) {
    await deleteFile('logos', settings.logo_url);
  }

  await execute(
    `UPDATE org_settings SET logo_url = NULL, updated_at = NOW() WHERE org_id = :orgId`,
    { orgId: org.id }
  );

  revalidatePath('/settings');
  return { success: true };
}

export async function getLogoUrl(): Promise<string | null> {
  const org = await getUserOrganization();
  if (!org) return null;

  const settings = await queryOne<{ logo_url: string | null }>(
    `SELECT logo_url FROM org_settings WHERE org_id = :orgId`,
    { orgId: org.id }
  );

  if (!settings?.logo_url) return null;

  return getSignedDownloadUrl('logos', settings.logo_url, 3600);
}
