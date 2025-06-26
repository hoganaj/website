import { client } from '@/sanity/lib/client';
import { Post } from '@/utils/interface';
import { MetadataRoute } from 'next';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  async function getPosts(lang: 'en' | 'zh') {
    const POSTS_QUERY = `*[
      _type == "post"
      && defined(slug.current)
      && language == $lang
    ]|order(publishedAt desc){_id, title, slug, publishedAt, _updatedAt}`;
    const data = await client.fetch(POSTS_QUERY, { lang });
    return data;
  }

  const [enPosts, zhPosts]: [Post[], Post[]] = await Promise.all([
    getPosts('en'),
    getPosts('zh'),
  ]);

  // Static pages with alternates
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 1.0,
      alternates: {
        languages: {
          en: `${url}/`,
          zh: `${url}/zh/`,
        },
      },
    },
    {
      url: `${url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${url}/about`,
          zh: `${url}/zh/about`,
        },
      },
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${url}/blog`,
          zh: `${url}/zh/blog`,
        },
      },
    },
  ];

  // Blog posts with alternates when available
  const blogEntries: MetadataRoute.Sitemap = enPosts.map((post) => {
    const zhEquivalent = zhPosts.find(
      (zhPost) => zhPost.slug.current === post.slug.current
    );

    return {
      url: `${url}/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
      ...(zhEquivalent && {
        alternates: {
          languages: {
            en: `${url}/blog/${post.slug.current}`,
            zh: `${url}/zh/blog/${zhEquivalent.slug.current}`,
          },
        },
      }),
    };
  });

  // Chinese blog posts that don't have English equivalents
  const uniqueZhBlogs: MetadataRoute.Sitemap = zhPosts
    .filter(
      (zhPost) =>
        !enPosts.some((enPost) => enPost.slug.current === zhPost.slug.current)
    )
    .map((post) => ({
      url: `${url}/zh/blog/${post.slug.current}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    }));

  return [...staticPages, ...blogEntries, ...uniqueZhBlogs];
}
