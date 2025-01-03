import React from 'react';
import Image from "next/image";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

const TimelineItem: React.FC<TimelineItem> = ({ year, title, description, image }) => (
  <li>
    <hr/>
    <div className="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="timeline-start">
      <Image src={image} alt={title} width={64} height={64} />
    </div>
    <div className="timeline-end mb-10">
      <time className="font-mono italic">{year}</time>
      <div className="text-lg font-black">{title}</div>
      {description}
    </div>
    <hr/>
  </li>
);

const Timeline: React.FC<{ dict: Dictionary }> = ({ dict }) => {
  const experiences: TimelineItem[] = [
    {
      year: '2021 - Present',
      title: dict.about.gfk.title,
      description: dict.about.gfk.desc,
      image: "/GfK.png",
    },
    {
      year: '2020 - 2021',
      title: dict.about.netbuilder.title,
      description: dict.about.netbuilder.desc,
      image: "/nb.png",
    },
    {
      year: '2017 - 2020',
      title: dict.about.uni.title,
      description: dict.about.uni.desc,
      image: "/UoS.svg",
    },
  ];

  return (
    <div className="max-w-3xl w-full">
      <ul className="timeline timeline-vertical max-md:timeline-compact">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} {...exp} />
        ))}
      </ul>
    </div>
  );
};

export default Timeline;