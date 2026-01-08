import { NextRequest, NextResponse } from 'next/server';
import { confirmSignUp } from '@/lib/aws/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    await confirmSignUp(email, code);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 400 }
    );
  }
}
