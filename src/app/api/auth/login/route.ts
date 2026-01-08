import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/aws/auth';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await signIn(email, password);

    if (!result.accessToken) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    
    cookieStore.set('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: result.expiresIn || 3600,
      path: '/',
    });

    if (result.refreshToken) {
      cookieStore.set('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }

    if (result.idToken) {
      cookieStore.set('idToken', result.idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: result.expiresIn || 3600,
        path: '/',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Login failed' },
      { status: 401 }
    );
  }
}
