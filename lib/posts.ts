import fs from 'fs';
import { join } from 'path';
import { bundleMDX } from 'mdx-bundler';
import remarkPrism from 'remark-prism';
import { parseISO, format } from 'date-fns';
import { Frontmatter, Post, PostWithCode } from '@/types/post';

const getPostsDirectory = () => join(process.cwd(), 'posts');

export const getPostBySlug = async (slug: string): Promise<PostWithCode> => {
  const cleanSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(getPostsDirectory(), `${cleanSlug}.mdx`);
  const mdxSource = fs.readFileSync(fullPath, 'utf8');
  const { code, frontmatter } = await bundleMDX(mdxSource, {
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        // @ts-ignore
        ...(options.remarkPlugins ?? []),
        // @ts-ignore
        remarkPrism,
      ];

      return options;
    },
    grayMatterOptions(options) {
      return options;
    },
  });

  const publishedAtFormats = ['MMMM dd, yyyy'].reduce<Record<string, string>>((acc, dateFormat) => {
    acc[dateFormat] = format(parseISO(frontmatter.publishedAt), dateFormat) || '';
    return acc;
  }, {});

  return {
    code,
    frontmatter: frontmatter as Frontmatter,
    post: {
      ...frontmatter,
      slug: cleanSlug,
      publishedAtFormats,
    } as Post,
  };
};

export const getAllPosts = async (): Promise<PostWithCode[]> => {
  const slugs = fs.readdirSync(getPostsDirectory()).filter((slug) => slug.endsWith('.mdx'));
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return posts;
};
