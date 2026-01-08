import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('idToken');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: error.message || 'Logout failed' },
      { status: 500 }
    );
  }
}
