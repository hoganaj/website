import DuoStreak from '@/app/[lang]/components/duoStreak';
import Timeline from '@/app/[lang]/components/timeline';
import React from 'react';
import { getDictionary } from '../dictionaries';

export default async function About({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>
}) {

  const lang = (await params).lang
  const dict = await getDictionary(lang)
  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="max-w-2xl w-full text-justify mb-8">
          <p>
            {dict.about.intro}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Timeline dict={dict} />
        </div>
        <div className="w-full flex justify-center mt-8">
          <DuoStreak />
        </div>
      </div>
    </>
  );
};
