'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { getUserOrganization } from './organizations';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getNextMonthStart } from '../utils';

export async function getTemplates() {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('invoice_templates')
    .select(`
      *,
      clients (id, name)
    `)
    .eq('org_id', org.id)
    .order('name');

  if (error) throw new Error(error.message);
  return data;
}

export async function getTemplate(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { data, error } = await supabase
    .from('invoice_templates')
    .select(`
      *,
      clients (id, name),
      invoice_template_items (
        *,
        consultants (id, name)
      )
    `)
    .eq('id', id)
    .eq('org_id', org.id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createTemplate(formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const clientId = formData.get('clientId') as string;
  const name = formData.get('name') as string;
  const dayOfMonth = parseInt(formData.get('dayOfMonth') as string);
  const autoSend = formData.get('autoSend') === 'true';

  const nextRunAt = getNextMonthStart(dayOfMonth);

  const { data: template, error: templateError } = await supabase
    .from('invoice_templates')
    .insert({
      org_id: org.id,
      client_id: clientId,
      name,
      day_of_month: dayOfMonth,
      next_run_at: nextRunAt.toISOString(),
      auto_send: autoSend,
    })
    .select()
    .single();

  if (templateError) throw new Error(templateError.message);

  // Parse items from formData
  const itemsJson = formData.get('items') as string;
  if (itemsJson) {
    const items = JSON.parse(itemsJson);
    const itemsToInsert = items.map((item: any, index: number) => ({
      org_id: org.id,
      template_id: template.id,
      consultant_id: item.consultantId || null,
      description: item.description,
      qty_default: item.qtyDefault || 0,
      rate_default: item.rateDefault,
      sort_order: index,
    }));

    const { error: itemsError } = await supabase
      .from('invoice_template_items')
      .insert(itemsToInsert);

    if (itemsError) throw new Error(itemsError.message);
  }

  revalidatePath('/templates');
  redirect('/templates');
}

export async function updateTemplate(id: string, formData: FormData) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const clientId = formData.get('clientId') as string;
  const name = formData.get('name') as string;
  const dayOfMonth = parseInt(formData.get('dayOfMonth') as string);
  const autoSend = formData.get('autoSend') === 'true';

  const { error: templateError } = await supabase
    .from('invoice_templates')
    .update({
      client_id: clientId,
      name,
      day_of_month: dayOfMonth,
      auto_send: autoSend,
    })
    .eq('id', id)
    .eq('org_id', org.id);

  if (templateError) throw new Error(templateError.message);

  // Delete existing items
  await supabase
    .from('invoice_template_items')
    .delete()
    .eq('template_id', id);

  // Insert new items
  const itemsJson = formData.get('items') as string;
  if (itemsJson) {
    const items = JSON.parse(itemsJson);
    const itemsToInsert = items.map((item: any, index: number) => ({
      org_id: org.id,
      template_id: id,
      consultant_id: item.consultantId || null,
      description: item.description,
      qty_default: item.qtyDefault || 0,
      rate_default: item.rateDefault,
      sort_order: index,
    }));

    const { error: itemsError } = await supabase
      .from('invoice_template_items')
      .insert(itemsToInsert);

    if (itemsError) throw new Error(itemsError.message);
  }

  revalidatePath('/templates');
  redirect('/templates');
}

export async function deleteTemplate(id: string) {
  const supabase = await createSupabaseClient();
  const org = await getUserOrganization();

  if (!org) throw new Error('No organization found');

  const { error } = await supabase
    .from('invoice_templates')
    .delete()
    .eq('id', id)
    .eq('org_id', org.id);

  if (error) throw new Error(error.message);

  revalidatePath('/templates');
  return { success: true };
}
