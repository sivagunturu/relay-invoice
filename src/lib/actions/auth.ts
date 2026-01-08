'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser, AuthUser } from '@/lib/aws/auth';

export async function getUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      return null;
    }

    const user = await getCurrentUser(accessToken);
    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('idToken');
  
  redirect('/auth/login');
}
