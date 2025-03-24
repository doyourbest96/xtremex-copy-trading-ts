import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const publicPaths = ['/', '/login']

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = publicPaths.includes(path)

  // Get the token from the cookies
  const isAuthenticated = request.cookies.has('auth_token')

  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isPublicPath) {
    // Redirect to home if trying to access login while already authenticated
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure which paths should be processed by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:jpg|jpeg|gif|png|svg|webp)$).*)',
  ],
}
