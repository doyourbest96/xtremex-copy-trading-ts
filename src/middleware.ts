import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
const publicPaths = ['/', '/login']

// This function checks if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some(publicPath => path === publicPath || path.startsWith(`${publicPath}/`))
}

export async function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname
  console.log('path:', path)

  // Check if the path is public
  const isPathPublic = isPublicPath(path)
  console.log('isPublicPath:', isPathPublic)

  // Get auth token from header or cookie
  const authHeader = request.headers.get('x-auth-token')
  const authCookie = request.cookies.get('auth_token')?.value
  
  // Use header or cookie, whichever is available
  let rawToken = authHeader || authCookie
  console.log('token:', rawToken)
  
  // Extract the actual token by removing the "Bearer " prefix if present
  let authToken = null
  if (rawToken) {
    if (rawToken.startsWith('Bearer ')) {
      authToken = rawToken.split(' ')[1]
    } else {
      authToken = rawToken
    }
  }
  
  let isAuthenticated = false
  
  if (authToken) {
    try {
      // Convert the JWT_SECRET string to a TextEncoder
      const secretKey = new TextEncoder().encode(JWT_SECRET)
      await jwtVerify(authToken, secretKey)
      isAuthenticated = true
    } catch (error) {
      console.error('Token verification failed:', error)
      isAuthenticated = false
    }
  }
  
  console.log('isAuthenticated:', isAuthenticated)
  
  // Redirect logic
  if (!isAuthenticated && !isPathPublic) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isPathPublic) {
    // Redirect to dashboard if trying to access login while already authenticated
    return NextResponse.redirect(new URL('/dashboard', request.url))
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
