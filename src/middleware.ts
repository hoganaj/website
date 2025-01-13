import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for studio routes
  if (pathname.startsWith('/studio')) {
    return NextResponse.next();
  }

  // Check if this is a route without a locale prefix
  const pathnameHasLocale = i18nConfig.locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If no locale prefix and not at root, reset to default locale
  if (!pathnameHasLocale && pathname !== '/') {
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    if (localeCookie && localeCookie.value !== i18nConfig.defaultLocale) {
      const response = NextResponse.redirect(
        new URL(`/${i18nConfig.defaultLocale}${pathname}`, request.url)
      );
      response.cookies.set('NEXT_LOCALE', i18nConfig.defaultLocale);
      return response;
    }
  }
  
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