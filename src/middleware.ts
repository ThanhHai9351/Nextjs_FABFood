import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


const privatePaths = ['/me']
const authpaths = ['/login','/register']

export function middleware(request: NextRequest) {
    const {pathname } = request.nextUrl
    const sessionToken = request.cookies.get('sessionToken')?.value

    if(privatePaths.some(path => pathname.startsWith(path))&& !sessionToken)
    {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if(authpaths.some(path => pathname.startsWith(path))&& sessionToken)
      {
        return NextResponse.redirect(new URL('/me', request.url))
      }

      return NextResponse.next()
}
 
export const config = {
  matcher: [
   ...privatePaths,...authpaths
  ],
}