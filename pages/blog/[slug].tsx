import React from 'react';
import { GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { MDXComponents } from '@/components/MdxComponents';
import { Box, Badge, Heading, Link, Text } from '@/system';
import * as Layout from '@/components/Layout';
import { Content } from '@/components';
import NextHead from 'next/head';

import type { Post } from '.contentlayer/types';
import { allPosts } from '.contentlayer/data';

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: allPosts.map(({ slug }) => ({ params: { slug } })),
  };
};

type PageProps = {
  post: Post;
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const slug: string = (typeof params?.slug === 'string' ? params?.slug : params?.slug?.[0]) || '';
  const post = allPosts.find((post) => post.slug === slug);

  if (!post || (post.draft && process.env.NODE_ENV !== 'development')) {
    return {
      notFound: true,
    };
  }

  return { props: { post } };
};

export default function PostPage({ post }: PageProps) {
  const { title, description, publishedDate, draft, body } = post;
  const RootMDXComponent = useMDXComponent(body.code);

  return (
    <>
      <TitleAndMetaTags description={title} />
      <NextHead>
        <link href="/prism.css" rel="stylesheet" />
      </NextHead>

      <Layout.Main>
        <Content.Root as="article">
          <Content.Header>
            <Heading level="1">{title}</Heading>

            {publishedDate ? (
              <Text
                as="time"
                css={{
                  my: '$1',
                  mx: 'auto',
                }}
              >
                {publishedDate}
              </Text>
            ) : null}

            {description ? (
              <Text as="p" css={{ fontSize: '$2' }}>
                {description}
              </Text>
            ) : null}

            {draft ? <Badge css={{}}>Draft</Badge> : null}
          </Content.Header>

          <Content.Section
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '$6',
            }}
          >
            <RootMDXComponent components={MDXComponents as any} />
          </Content.Section>
        </Content.Root>
      </Layout.Main>
    </>
  );
}
