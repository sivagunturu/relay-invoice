import { NextRequest, NextResponse } from 'next/server';
import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
});

const CLIENT_ID = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const command = new ResendConfirmationCodeCommand({
      ClientId: CLIENT_ID,
      Username: email,
    });

    await client.send(command);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Resend code error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to resend code' },
      { status: 400 }
    );
  }
}
