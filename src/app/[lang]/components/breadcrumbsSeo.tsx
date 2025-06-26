'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbsSchema } from './SEO/BreadcrumbsSchema';

interface BreadcrumbsSeoProps {
  homeLabel: string;
  labels: Record<string, string>;
  lang: string;
}

// This component renders only the schema markup, not the visual breadcrumbs
const BreadcrumbsSeo: React.FC<BreadcrumbsSeoProps> = ({
  homeLabel,
  labels,
  lang,
}) => {
  const pathname = usePathname();

  // Skip rendering for homepage
  if (pathname === '/' || pathname === `/${lang}`) {
    return null;
  }

  // Build breadcrumbs based on the current path
  const pathSegments = pathname.split('/').filter(Boolean);

  // Remove language segment if present
  const segments =
    lang !== 'en' && pathSegments[0] === lang
      ? pathSegments.slice(1)
      : pathSegments;

  const breadcrumbs = segments.map((segment, index) => {
    const label = labels[segment] || segment;
    const href =
      lang === 'en'
        ? `/${segments.slice(0, index + 1).join('/')}`
        : `/${lang}/${segments.slice(0, index + 1).join('/')}`;

    return { label, href };
  });

  // Add home as the first breadcrumb
  breadcrumbs.unshift({
    label: homeLabel,
    href: lang === 'en' ? '/' : `/${lang}`,
  });

  // Prepare items for schema
  const schemaItems = breadcrumbs.map((crumb) => ({
    name: crumb.label,
    url: `${process.env.NEXT_PUBLIC_URL}${crumb.href}`,
  }));

  // Only render the schema, not the visual breadcrumbs
  return <BreadcrumbsSchema items={schemaItems} />;
};

export default BreadcrumbsSeo;
