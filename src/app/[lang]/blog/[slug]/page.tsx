import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import type { Metadata } from 'next';
import { BlogPostJsonLd } from "../../components/SEO/JsonLd";
import { notFound } from "next/navigation";
import { FaCalendar, FaClock, FaTag } from "react-icons/fa";

function calculateReadingTime(blocks: any[]): number {
  const text = blocks
    ?.filter((block: any) => block._type === 'block')
    .map((block: any) => {
      if (!block.children) return '';
      return block.children.map((child: any) => child.text).join('');
    })
    .join(' ');

  const words = text?.split(/\s+/).length || 0;
  return Math.ceil(words / 200); // Assuming 200 words per minute reading speed
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug && language == $lang][0]{
  _id,
  title,
  slug,
  publishedAt,
  _updatedAt,
  body,
  mainImage,
  "categories": categories[]->title,
  "author": author->name
}`;

export async function generateMetadata(props: Params): Promise<Metadata | undefined> {
  const params = await props.params;
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  
  if (!post) {
    return;
  }
  
  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(1200).height(630).url()
    : `${url}/opengraph-image.png`;

  const readingTime = calculateReadingTime(post.body);
  const description = `${post.categories ? post.categories.join(', ') : 'Blog article'} | ${readingTime} min read`;
  
  return {
    title: post.title,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      locale: params.lang,
      url:
        params.lang === "en"
          ? `/blog/${params.slug}`
          : `/${params.lang}/blog/${params.slug}`,
      siteName: "Aidan Hogan",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: [post.author || "Aidan Hogan"],
      ...(postImageUrl && 
        { 
          images: [
            {
              url: postImageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            }
          ]
        }
      )
    },
    alternates: {
      canonical: `${url}${params.lang === "en" ? "" : `/${params.lang}`}/blog/${params.slug}`,
      languages: {
        'en': `${url}/blog/${params.slug}`,
        'zh': `${url}/zh/blog/${params.slug}`
      },
    },
  }
}

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

interface Params {
  params: Promise<{
    slug: string,
    lang: "en" | "zh"
  }>
}

export default async function PostPage(props: Params) {
  const params = await props.params;
  const lang = params.lang;
  const dict = await getDictionary(lang);
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  if (!post) {
    notFound();
  }

  const postImageUrl = post.mainImage
    ? urlFor(post.mainImage)?.width(800).height(450).url()
    : null;
  
  const readingTime = calculateReadingTime(post.body);

  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <BlogPostJsonLd post={post} />
      
      <Link href={lang === 'en' ? '/blog' : `/${lang}/blog`} className="hover:underline flex items-center gap-2">
        {dict.blog.back}
      </Link>
      
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      
      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-1">
          <FaCalendar className="text-primary" />
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>
        </div>
        
        <div className="flex items-center gap-1">
          <FaClock className="text-primary" />
          <span>{readingTime} min read</span>
        </div>
        
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-1">
            <FaTag className="text-primary" />
            <span>{post.categories.join(', ')}</span>
          </div>
        )}
      </div>
      
      {postImageUrl && (
        <figure className="mb-8">
          <Image
            src={postImageUrl}
            alt={post.title}
            className="w-full rounded-xl object-cover"
            width={800}
            height={450}
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {post.mainImage?.alt && (
            <figcaption className="text-sm text-center mt-2 text-gray-500">
              {post.mainImage.alt}
            </figcaption>
          )}
        </figure>
      )}
      
      <article className="prose prose-lg max-w-none">
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </article>
    </main>
  );
}