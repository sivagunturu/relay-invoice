import { NextRequest, NextResponse } from 'next/server';
import { forgotPassword } from '@/lib/aws/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    await forgotPassword(email);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: error.message || 'Request failed' },
      { status: 400 }
    );
  }
}
