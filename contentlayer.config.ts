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
      required: false,
    },
  },
  computedFields: {
    slug: { type: 'string', resolve: (post) => post._raw.flattenedPath },
    readingTime: {
      type: 'json',
      resolve: (post) => readingTime(post.body.raw, { wordsPerMinute: 300 }),
    },
    /**
     * UTC value
     */
    publishedAt: {
      type: 'number',
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
