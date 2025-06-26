import React from 'react';
import { SanityDocument } from 'next-sanity';

export function WebsiteSchema({ nonce, url }: { nonce?: string; url: string }) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Aidan Hogan',
          url: url,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  );
}

export function PersonJsonLd({ nonce, url }: { nonce?: string; url: string }) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Aidan Hogan',
          url: url,
          jobTitle: 'Software Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'GfK/NIQ',
          },
          sameAs: [
            'https://github.com/hoganaj',
            'https://www.linkedin.com/in/aidanjhogan/',
          ],
        }),
      }}
    />
  );
}

export function BlogPostJsonLd({
  post,
  nonce,
  url,
}: {
  post: SanityDocument;
  nonce?: string;
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          datePublished: post.publishedAt,
          dateModified: post._updatedAt || post.publishedAt,
          author: {
            '@type': 'Person',
            name: post.author || 'Aidan Hogan',
          },
          publisher: {
            '@type': 'Person',
            name: 'Aidan Hogan',
            logo: {
              '@type': 'ImageObject',
              url: `${url}/avatar.png`,
            },
          },
          description: 'Blog post by Aidan Hogan',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${url}/blog/${post.slug.current}`,
          },
        }),
      }}
    />
  );
}
