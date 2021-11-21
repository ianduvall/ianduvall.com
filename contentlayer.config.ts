import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import readingTime from 'reading-time';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import { parseISO } from 'date-fns';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  bodyType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    publishedDate: {
      type: 'string',
      required: true,
    },
    draft: {
      type: 'boolean',
    },
    tags: {
      type: 'list',
      default: [],
      of: { type: 'string' },
    },
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
    readingTimeText: {
      type: 'string',
      description: 'A description of the length of the post. format: `${mins} min read`',
      resolve: (post) => readingTime(post.body.raw, { wordsPerMinute: 250 }).text,
    },
    publishedAt: {
      type: 'number',
      description: 'UTC time the post was published',
      resolve: (post) =>
        post.publishedDate ? parseISO(post.publishedDate).valueOf() : Number.MAX_SAFE_INTEGER,
    },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});
