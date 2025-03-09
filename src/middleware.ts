// src/middleware.ts
import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { NextRequest } from 'next/server';
import { generateNonce } from './utils/nonceUtils';

export function middleware(request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = generateNonce();
  
  // Create a response to work with
  const response = NextResponse.next();
  
  // Add the nonce as a header so we can access it in the app
  response.headers.set('x-nonce', nonce);

  // Set CSP header with the dynamic nonce
  const csp = `
    default-src 'self';
    script-src 'self' https://www.google-analytics.com https://cdn.sanity.io 'nonce-${nonce}';
    style-src 'self' https://fonts.googleapis.com 'nonce-${nonce}';
    img-src 'self' data: blob: https://res.cloudinary.com https://cdn.sanity.io https://www.duolingo.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://www.duolingo.com https://*.sanity.io;
    frame-src https://*.sanity.io;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();
  
  response.headers.set('Content-Security-Policy', csp);
  
  const pathname = request.nextUrl.pathname;

  // Skip middleware for studio routes
  if (pathname.startsWith('/studio')) {
    return response;
  }

  // Check if this is a route without a locale prefix
  const pathnameHasLocale = i18nConfig.locales.some(locale => 
    pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If no locale prefix and not at root, reset to default locale
  if (!pathnameHasLocale && pathname !== '/') {
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    if (localeCookie && localeCookie.value !== i18nConfig.defaultLocale) {
      const localeResponse = NextResponse.redirect(
        new URL(`/${i18nConfig.defaultLocale}${pathname}`, request.url)
      );
      localeResponse.cookies.set('NEXT_LOCALE', i18nConfig.defaultLocale);
      // Copy the nonce header to the redirect response
      localeResponse.headers.set('x-nonce', nonce);
      return localeResponse;
    }
  }
  
  // Check if we're at root and have a NEXT_LOCALE cookie
  if (pathname === '/') {
    const localeCookie = request.cookies.get('NEXT_LOCALE');
    
    // If we have a non-default locale cookie at root path, reset it to default
    if (localeCookie && localeCookie.value !== i18nConfig.defaultLocale) {
      const rootResponse = NextResponse.redirect(new URL('/', request.url));
      rootResponse.cookies.set('NEXT_LOCALE', i18nConfig.defaultLocale);
      // Copy the nonce header to the redirect response
      rootResponse.headers.set('x-nonce', nonce);
      return rootResponse;
    }
  }
  
  // Apply i18n routing
  const i18nResponse = i18nRouter(request, i18nConfig);
  // Copy the nonce to the i18n response if we got one
  if (i18nResponse && i18nResponse !== response) {
    i18nResponse.headers.set('x-nonce', nonce);
    return i18nResponse;
  }
  
  return response;
}

export const config = {
  matcher: ['/((?!api|static|_next|_vercel|.*\\..*).*)', '/']
};