'use server';

import { createClient as createSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signUpSchema, loginSchema } from '../validations/schemas';

export async function signUp(formData: FormData) {
  const supabase = await createSupabaseClient();

  const data = signUpSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
    companyName: formData.get('companyName'),
  });

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    // Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({ name: data.companyName })
      .select()
      .single();

    if (orgError || !org) {
      return { error: 'Failed to create organization' };
    }

    // Add user as owner
    await supabase.from('org_members').insert({
      org_id: org.id,
      user_id: authData.user.id,
      role: 'owner',
      status: 'active',
    });

    // Create org settings
    await supabase.from('org_settings').insert({
      org_id: org.id,
      company_name: data.companyName,
      default_terms: 'Net 60',
      default_currency: 'USD',
      invoice_prefix: 'INV',
      invoice_counter: 0,
    });
  }

  redirect('/dashboard');
}

export async function login(formData: FormData) {
  const supabase = await createSupabaseClient();

  const data = loginSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function logout() {
  const supabase = await createSupabaseClient();
  await supabase.auth.signOut();
  redirect('/login');
}

export async function getUser() {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
