'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { revalidatePath } from 'next/cache';

export async function uploadLogo(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const file = formData.get('logo') as File;
  if (!file) throw new Error('No file provided');

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error('File size must be less than 2MB');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${org.id}/logo.${fileExt}`;

  // Upload to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('logos')
    .upload(fileName, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) throw new Error(uploadError.message);

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(fileName);

  // Update org_settings with logo path
  const { error: updateError } = await supabase
    .from('org_settings')
    .update({ logo_url: publicUrl })
    .eq('org_id', org.id);

  if (updateError) throw new Error(updateError.message);

  revalidatePath('/settings');
  return { success: true, logoUrl: publicUrl };
}

export async function deleteLogo() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const fileName = `${org.id}/logo`;

  // Delete from storage (try all common extensions)
  const extensions = ['png', 'jpg', 'jpeg', 'gif', 'webp'];
  for (const ext of extensions) {
    await supabase.storage.from('logos').remove([`${fileName}.${ext}`]);
  }

  // Update org_settings
  const { error } = await supabase
    .from('org_settings')
    .update({ logo_url: null })
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/settings');
  return { success: true };
}
