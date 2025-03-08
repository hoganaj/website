export interface Post {
  title: string
  slug: { current: string };
  publishedAt: string;
  body: any;
  _id: string;
  author?: string;
  _updatedAt?: string;
  mainImage?: any;
}