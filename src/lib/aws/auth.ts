import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
});

const CLIENT_ID = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID!;

export interface AuthUser {
  id: string;
  sub: string;
  email: string;
  emailVerified: boolean;
}

export async function signUp(email: string, password: string, name: string) {
  const command = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email },
      { Name: "name", Value: name },
    ],
  });

  const response = await client.send(command);
  return {
    userId: response.UserSub,
    confirmed: response.UserConfirmed,
  };
}

export async function confirmSignUp(email: string, code: string) {
  const command = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  });

  await client.send(command);
  return { success: true };
}

export async function signIn(email: string, password: string) {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  const response = await client.send(command);
  return {
    accessToken: response.AuthenticationResult?.AccessToken,
    idToken: response.AuthenticationResult?.IdToken,
    refreshToken: response.AuthenticationResult?.RefreshToken,
    expiresIn: response.AuthenticationResult?.ExpiresIn,
  };
}

export async function refreshTokens(refreshToken: string) {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  });

  const response = await client.send(command);
  return {
    accessToken: response.AuthenticationResult?.AccessToken,
    idToken: response.AuthenticationResult?.IdToken,
    expiresIn: response.AuthenticationResult?.ExpiresIn,
  };
}

export async function forgotPassword(email: string) {
  const command = new ForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: email,
  });

  await client.send(command);
  return { success: true };
}

export async function confirmForgotPassword(
  email: string,
  code: string,
  newPassword: string
) {
  const command = new ConfirmForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  });

  await client.send(command);
  return { success: true };
}

export async function getCurrentUser(accessToken: string): Promise<AuthUser | null> {
  try {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    });

    const response = await client.send(command);
    const email = response.UserAttributes?.find((a) => a.Name === "email")?.Value;
    const emailVerified = response.UserAttributes?.find((a) => a.Name === "email_verified")?.Value === "true";

    const sub = response.UserAttributes?.find((a) => a.Name === "sub")?.Value || response.Username!;
    
    return {
      id: response.Username!,
      sub,
      email: email!,
      emailVerified,
    };
  } catch {
    return null;
  }
}
