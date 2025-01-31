import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "../../dictionaries";
import type { Metadata } from 'next';

const POST_QUERY = `*[_type == "post" && slug.current == $slug && language == $lang][0]`;

export async function generateMetadata(props: Params): Promise<Metadata | undefined> {
  const params = await props.params;
  // const dict = await getDictionary(params.lang);
  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(630).url()
    : undefined;
  if (!post) {
    return;
  }
  return {
    title: post.title,
    description: "Blog article by Aidan Hogan",
    openGraph: {
      title: post.title,
      description: "Blog article by Aidan Hogan",
      type: "article",
      locale: params.lang,
      url:
        params.lang === "en"
          ? `/blog/${params.slug}`
          : `/${params.lang}/blog/${params.slug}`,
      siteName: "Aidan Hogan",
      ...(postImageUrl && 
        { 
          images: [
            {
              url: postImageUrl,
              width: 1200,
              height: 630,
            }
          ]
        }
      )
    }
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

  const lang = params.lang
  const dict = await getDictionary(lang)

  const post = await client.fetch<SanityDocument>(POST_QUERY, params, options);

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="hover:underline">
        {dict.blog.back}
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main>
  );
}