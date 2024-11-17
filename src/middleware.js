import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
}

// Match only the root route ('/')
export const config = {
  matcher: '/',
};
