import { NextResponse } from 'next/server';

export function middleware(req: { url?: any; nextUrl?: any; headers?: any; }) {
  const { nextUrl, headers } = req;
  const acceptLanguage = headers.get('accept-language') || 'en'; // Default to 'en' if undefined
  const locale = nextUrl.locale || acceptLanguage.split(',')[0].split('-')[0]; // Extract base language
  const supportedLocales = ['en', 'zh']; // Add your supported locales here

  // Redirect to the supported locale if not already set
  if (!supportedLocales.includes(locale)) {
    return NextResponse.redirect(new URL(`/en${nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}
