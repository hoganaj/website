/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import {
  FaLaptopCode,
  FaMapMarkerAlt,
  FaTools,
  FaTableTennis,
} from 'react-icons/fa';
import { getDictionary } from './dictionaries';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata | undefined> {
  const lang = (await params).lang as 'en' | 'zh';
  const dict = await getDictionary(lang);
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  return {
    title: dict.metadata.home.title,
    description: dict.metadata.home.desc,
    openGraph: {
      title: dict.metadata.home.title,
      description: dict.metadata.home.desc,
      type: 'website',
      locale: lang,
      url: lang === 'en' ? '/' : `/${lang}`,
      siteName: 'Aidan Hogan',
      images: `${url}/opengraph-image.png`,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const lang = (await params).lang as 'en' | 'zh';
  const dict = await getDictionary(lang);

  return (
    <main className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="text-center">
        <div className="max-w-sm sm:max-w-md mx-auto">
          <Image
            alt="Avatar - Aidan Hogan"
            src="/avatar.png"
            priority
            width={200}
            height={200}
            className="mx-auto mb-6 w-32 h-32 sm:w-48 sm:h-48"
            sizes="(max-width: 640px) 128px, 192px"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-base-content">
            {dict.home.title}
          </h1>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3">
          {[
            {
              icon: <FaLaptopCode />,
              text: dict.home.job,
              color: 'text-blue-400',
            },
            {
              icon: <FaMapMarkerAlt />,
              text: dict.home.location,
              color: 'text-red-400',
            },
            {
              icon: <FaTools />,
              text: dict.home.stack,
              color: 'text-green-400',
            },
            {
              icon: <FaTableTennis />,
              text: dict.home.hobbies,
              color: 'text-yellow-400',
            },
          ].map(({ icon, text, color }, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6 py-4 w-full max-w-lg 
                        backdrop-blur-lg bg-white/10 border dark:bg-white/5 border-white/20 
                        rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <span className={`text-2xl shrink-0 ${color}`}>{icon}</span>
              <p className="text-lg text-left text-base-content">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
