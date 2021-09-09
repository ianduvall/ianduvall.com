import matter from 'gray-matter';

export interface Frontmatter {
  title: string;
  description?: string;
  publishedAt?: string;
  draft?: boolean;
  readingTime?: { text: string; minutes: number; time: number; words: number };
}

export interface Post extends Frontmatter {
  publishedAtFormats: {
    'MMMM dd, yyyy': string;
  };
  slug: string;
}

export type PostWithCode = {
  code: string;
  frontmatter: Frontmatter;
  post: Post;
};
