export interface Post {
  title: string
  slug: { current: string };
  publishedAt: string;
  body: any;
  _id: string;
}