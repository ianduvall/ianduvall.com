import React from 'react';
import { GetStaticProps } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { MDXComponents } from '@/components/MdxComponents';
import { Header } from '@/components/Header';
import { Badge, Link, Text } from '@/system';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post, PostWithCode } from '@/types/post';
import { TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box } from '@/system';

export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    fallback: false,
    paths: posts.map(({ post }) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = (typeof params?.slug === 'string' ? params?.slug : params?.slug?.[0]) || '';
  const { code, frontmatter, post } = await getPostBySlug(slug);

  return {
    props: {
      code,
      post,
    },
  };
};

export default function PostPage({ code, post }: PostWithCode) {
  const { draft, publishedAtFormats, slug, title, description } = post;
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);

  const twitterShare = `
	https://twitter.com/intent/tweet?
	text="${title}" by @ianwmduvall
	&url=https://ianduvall.com/blog/${slug}
	`;

  const publishedDate = publishedAtFormats['MMMM dd, yyyy'];

  return (
    <Box>
      <TitleAndMetaTags description={title} />
      <Header />

      <Box
        css={{
          mx: '$4',
          py: '$4',
          '@tablet-portrait-and-up': {
            mx: '$5',
            py: '$5',
          },
          '@tablet-landscape-and-up': {
            mx: '$6',
          },
        }}
      >
        <Box css={{ display: 'flex', alignItems: 'center' }}>
          <Text as="h1" css={{ fontSize: '$6' }}>
            {title}
          </Text>
          {draft ? <Badge css={{ mx: '$2' }}>Draft</Badge> : null}
        </Box>

        <Text
          as="time"
          css={{
            my: '$1',
            mx: 'auto',
            fontFamily: '$mono',
            color: '$gray800',
          }}
        >
          {publishedDate}
        </Text>

        {description ? (
          <Text as="p" css={{ fontSize: '$2' }}>
            {description}
          </Text>
        ) : null}

        <Box css={{ my: '$5' }}>
          <MDXComponent components={MDXComponents} />
        </Box>

        <Box css={{ mb: '$5' }}>
          <Text as="p" css={{ fontSize: '$4' }}>
            Share this post on{' '}
            <Link
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              title="Share this post on Twitter"
            >
              <TwitterLogoIcon />
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
