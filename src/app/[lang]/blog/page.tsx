import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { getDictionary } from "../dictionaries";
import type { Metadata } from 'next';

export async function generateMetadata({params}: { params: Promise<{ lang: 'en' | 'zh' }> }): Promise<Metadata | undefined> {
  const lang = (await params).lang
  const dict = await getDictionary(lang);
  
  return {
    title: dict.metadata.blog.title,
    description: dict.metadata.blog.desc,
    openGraph: {
      title: dict.metadata.blog.title,
      description: dict.metadata.blog.desc,
      type: "website",
      locale: lang,
      url: lang === "en" ? "/blog" : `/${lang}/blog`,
      siteName: "Aidan Hogan",
    }
  }
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && language == $lang
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Blog({
  params,
}: {
  params: Promise<{ lang: 'en' | 'zh' }>
}) {
  const lang = (await params).lang
  const dict = await getDictionary(lang)
  
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { lang }, options);

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">{dict.blog.title}</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`blog/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
