import { NextResponse } from 'next/server'

const MAINTENANCE_MODE = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'

export function middleware(request) {

  const url = request.nextUrl.clone()
  if (MAINTENANCE_MODE) {
    url.pathname = '/maintenance'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
