import { client } from "@/sanity/lib/client";
import { Post } from "@/utils/interface";
import { MetadataRoute } from "next";

export default async function sitemap():Promise<MetadataRoute.Sitemap> {

  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  async function getPosts(lang: "en" | "zh") {
    const POSTS_QUERY = `*[
      _type == "post"
      && defined(slug.current)
      && language == $lang
    ]|order(publishedAt desc){_id, title, slug, publishedAt}`;
    const data = await client.fetch(POSTS_QUERY, { lang });
    return data;
  }

  const [enPosts, zhPosts]: [Post[], Post[]] = await Promise.all([
    getPosts("en"),
    getPosts("zh"),
  ]);

  const postUrls = enPosts.map((post) => ({
    url: `${url}/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }));

  const zhPostUrls = zhPosts.map((post) => ({
    url: `${url}/zh/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }));


  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${url}/zh`
        }
      }
    },
    {
      url: `${url}/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${url}/zh/about`
        }
      }
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      alternates: {
        languages: {
          zh: `${url}/zh/blog`
        }
      }
    },
    ...postUrls,
    ...zhPostUrls
  ]
}