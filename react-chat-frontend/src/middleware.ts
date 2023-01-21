import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const refreshToken = request.cookies.get('REFRESH_TOKEN')

  if (!refreshToken) {
    request.nextUrl.pathname = '/'
    return NextResponse.redirect(request.nextUrl)
  }

}

export const config = {
  matcher: '/chat/:username*',
}
