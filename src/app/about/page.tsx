import DuoStreak from '@/components/duoStreak';
import Timeline from '@/components/timeline';
import React from 'react';

const About: React.FC = () => {
  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="max-w-2xl w-full text-justify mb-8">
          <p>
            Lucky you! You have found my corner of the internet! This is an informal place to introduce myself, showcase my career experience, projects and anything that piques my interest worthy of sharing.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <Timeline />
        </div>
        <div className="w-full flex justify-center mt-8">
          <DuoStreak />
        </div>
      </div>
    </>
  );
};

export default About;
