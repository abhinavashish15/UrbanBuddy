// Middleware disabled - using custom auth context instead
// This will be re-enabled when NextAuth is fully configured

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow all requests for now - auth is handled by AuthContext
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/book/:path*',
    '/checkout/:path*',
    '/payments/:path*',
  ],
}
