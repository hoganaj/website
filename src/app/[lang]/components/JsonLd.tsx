
export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
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

export function BlogPostJsonLd({ post }: { post: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "datePublished": post.publishedAt,
          "author": {
            "@type": "Person",
            "name": "Aidan Hogan"
          }
        })
      }}
    />
  );
}