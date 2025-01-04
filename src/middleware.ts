import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if we're at root and have a NEXT_LOCALE cookie
  if (pathname === '/') {
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    
    // If we have a non-default locale cookie at root path, reset it to default
    if (localeCookie && localeCookie.value !== i18nConfig.defaultLocale) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set('NEXT_LOCALE', i18nConfig.defaultLocale);
      return response;
    }
  }
  
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ['/((?!api|static|_next|_vercel|.*\\..*).*)', '/']
};