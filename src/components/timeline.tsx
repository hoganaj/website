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
    <div className="timeline-start md:text-end mb-10">
      <time className="font-mono italic">{year}</time>
      <div className="text-lg font-black">{title}</div>
      {description}
    </div>
    <div className="timeline-end mb-10">
      <Image src={image} alt={title} width={200} height={200} className="w-16 h-16 object-contain" />
    </div>
    <hr/>
  </li>
);

const Timeline: React.FC = () => {
  const experiences: TimelineItem[] = [
    {
      year: '2021 - Present',
      title: 'Software Engineer at GfK/NIQ',
      description: 'Building applications for GfK Boutique and NIQ Financial Services. Tech stack: TypeScript, React, Node, PostgreSQL ',
      image: "/GfK.png",
    },
    {
      year: '2020 - 2021',
      title: 'Graduate Software Engineer at NETbuilder',
      description: 'Developed Splunk applications, creating data visualizations, dashboards and data pipelines. Data manipulation and streaming with python.',
      image: "/nb.jpg",
    },
    {
      year: '2017 - 2020',
      title: 'BSc Computer Science',
      description: 'First Class with honors from University of Sheffield',
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