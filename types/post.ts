import matter from 'gray-matter';

interface PublishedPostFrontmatter {
  publishedDate: string;
  draft?: false;
}

interface DraftPostFrontmatter {
  publishedDate?: '';
  draft: boolean;
}
interface BaseFrontmatter {
  title: string;
  description?: string;
  slug: string;
}

export type PostFrontmatter = BaseFrontmatter & (PublishedPostFrontmatter | DraftPostFrontmatter);

export interface Post {
  code: string;
  frontmatter: PostFrontmatter;
  slug: string;
}
