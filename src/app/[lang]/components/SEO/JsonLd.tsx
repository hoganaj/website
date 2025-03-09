'use client';

import React from 'react';
import { SanityDocument } from 'next-sanity';

export function PersonJsonLd({ nonce }: { nonce?: string }) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Aidan Hogan",
          "url": process.env.NEXT_PUBLIC_URL,
          "jobTitle": "Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "GfK/NIQ"
          },
          "sameAs": [
            "https://github.com/hoganaj",
            "https://www.linkedin.com/in/aidanjhogan/"
          ]
        })
      }}
    />
  );
}

export function BlogPostJsonLd({ post, nonce }: { post: SanityDocument; nonce?: string }) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.publishedAt,
          "dateModified": post._updatedAt || post.publishedAt,
          "author": {
            "@type": "Person",
            "name": post.author || "Aidan Hogan"
          },
          "publisher": {
            "@type": "Person",
            "name": "Aidan Hogan",
            "logo": {
              "@type": "ImageObject",
              "url": `${process.env.NEXT_PUBLIC_URL}/avatar.png`
            }
          },
          "description": "Blog post by Aidan Hogan",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug.current}`
          }
        })
      }}
    />
  );
}