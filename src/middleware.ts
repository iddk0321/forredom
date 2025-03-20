import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import { cookieName, fallbackLng, languages } from '@/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)',
  ],
}

export function middleware(req: NextRequest) {
  let lng: string | undefined | null

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng) {
    lng = fallbackLng
  }

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url),
    )
  }

  return NextResponse.next()
}
