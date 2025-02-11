// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to public routes (home, signin, API)
  if (
    pathname === '/' ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // Check for authentication via userToken cookie
  const userToken = request.cookies.get('userToken');

  if (!userToken) {
    // Redirect to home if no authentication
    const url = new URL('/', request.url);
    return NextResponse.redirect(url);
  }

  // Proceed to requested route
  return NextResponse.next();
}