import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BLOCKED_PATTERNS = [
  /^\/.git(\/|$)/,
  /^\/.DS_Store$/,
  /^\/wp-admin(\/|$)/,
  /^\/wp-config\.php\.bak$/,
  /^\/phpmyadmin(\/|$)/,
  /^\/phpinfo\.php$/,
  /^\/backup\.(zip|sql)$/,
  /^\/database\.sql$/,
  /^\/config\.php$/,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/(.*)',
};
