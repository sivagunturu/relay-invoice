import { NextResponse, type NextRequest } from 'next/server';

const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/verify',
  '/auth/forgot-password',
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/verify',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/resend-code',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/favicon') || 
      pathname.includes('.')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!accessToken && !refreshToken) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
