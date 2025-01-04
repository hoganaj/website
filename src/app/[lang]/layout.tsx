import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/app/[lang]/components/footer";
import Header from "@/app/[lang]/components/header";
import { getDictionary } from "./dictionaries";
import React from "react";
import { notFound } from "next/navigation";
import i18nConfig from "@/i18nConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aidan Hogan",
  description: "Personal Website",
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: "en" | "zh" };
}>) {
  if (!i18nConfig.locales.includes(lang)) {
    notFound();
  }
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header dictionary={dictionary.header} lang={lang}/>
        <main className="flex-grow">
          {children}
        </main>
        <Footer dictionary={dictionary.footer} lang={lang}/>
      </body>
    </html>
  );
}
