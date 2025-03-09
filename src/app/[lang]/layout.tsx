import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/[lang]/components/footer";
import Header from "@/app/[lang]/components/header";
import { getDictionary } from "./dictionaries";
import React from "react";
import { notFound } from "next/navigation";
import i18nConfig from "@/i18nConfig";
import { PersonJsonLd } from "./components/SEO/JsonLd";
import BreadcrumbsSeo from "./components/breadcrumbsSeo";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: { params: Promise<{ lang: "en" | "zh" }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(url),
    title: {
      default: dict.metadata.layout.title,
      template: "Aidan Hogan | %s",
    },
    description: dict.metadata.layout.desc,
    openGraph: {
      title: dict.metadata.layout.title,
      description: dict.metadata.layout.desc,
      type: "website",
      locale: lang,
      url: lang === "en" ? "/" : `/${lang}`,
      siteName: "Aidan Hogan",
    },
    alternates: {
      canonical: `${url}${lang === "en" ? "" : `/${lang}`}`,
      languages: {
        'en': `${url}/`,
        'zh': `${url}/zh`,
      },
    },
  };
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { lang: "en" | "zh" };
  }>
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  if (!i18nConfig.locales.includes(lang)) {
    notFound();
  }
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link
          rel="preload"
          href="/avatar.png"
          as="image"
          type="image/png"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen overflow-x-hidden`} suppressHydrationWarning>
        <PersonJsonLd />
        <Header dictionary={dictionary.header} lang={lang}/>
        <main className="flex-grow">
          <BreadcrumbsSeo 
            homeLabel={dictionary.breadcrumbs?.home || "Home"} 
            labels={dictionary.breadcrumbs?.labels || {}} 
            lang={lang} 
          />
          {children}
        </main>
        <Footer dictionary={dictionary.footer} lang={lang}/>
      </body>
    </html>
  );
}
