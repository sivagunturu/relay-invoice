import { cookies } from 'next/headers';
import { getCurrentUser, refreshTokens, AuthUser } from './auth';

export interface Session {
  user: AuthUser;
  accessToken: string;
}

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken && refreshToken) {
      try {
        const refreshed = await refreshTokens(refreshToken);
        if (refreshed.accessToken) {
          accessToken = refreshed.accessToken;
          
          cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: refreshed.expiresIn || 3600,
            path: '/',
          });
          
          if (refreshed.idToken) {
            cookieStore.set('idToken', refreshed.idToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: refreshed.expiresIn || 3600,
              path: '/',
            });
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return null;
      }
    }

    if (!accessToken) {
      return null;
    }

    const user = await getCurrentUser(accessToken);
    if (!user) {
      return null;
    }

    return { user, accessToken };
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  return session;
}
