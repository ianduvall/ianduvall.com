import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { MDXComponents } from '@/components/MdxComponents';
import { Badge, Box, Button, Heading, Link, Text } from '@/system';
import * as Layout from '@/components/Layout';
import { Content } from '@/components';

import type { Post } from '.contentlayer/types';
import { publishedPosts } from '@/lib/posts';

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: publishedPosts.map(({ slug }) => ({ params: { slug } })),
  };
};

type PageProps = {
  post: Post;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug: string = (typeof params?.slug === 'string' ? params?.slug : params?.slug?.[0]) || '';
  const post = publishedPosts.find((post) => post.slug === slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return { props: { post } };
};

export default function PostPage({ post }: PageProps) {
  const { title, description, publishedDate, draft, body, tags, readingTime } = post;
  const RootMDXComponent = useMDXComponent(body.code);

  return (
    <>
      <TitleAndMetaTags description={title} />

      <Layout.Main>
        <Content.Root as="article">
          <Content.Header>
            <Heading level="1">{title}</Heading>

            {description ? (
              <Text as="p" css={{ fontSize: '$2' }}>
                {description}
              </Text>
            ) : null}
            <Box css={{ display: 'flex', alignItems: 'center', gap: '$5' }}>
              {publishedDate ? <Text as="time">{publishedDate}</Text> : null}
              {draft ? <Badge>Draft</Badge> : null}
              {tags?.map((tag) => (
                <NextLink key={tag} href={`/blog?tag=${tag}`} passHref prefetch={false}>
                  <Button as={Link} badge>
                    #{tag}
                  </Button>
                </NextLink>
              ))}
            </Box>
          </Content.Header>

          <Content.Section
            css={{
              '> *': {
                my: '$5',
              },
            }}
          >
            <RootMDXComponent components={MDXComponents as any} />
          </Content.Section>
        </Content.Root>
      </Layout.Main>
    </>
  );
}
