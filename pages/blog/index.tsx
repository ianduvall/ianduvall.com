import React from 'react';
import NextLink from 'next/link';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { publishedPosts } from '@/lib/posts';
import { GetStaticProps } from 'next';
import { Badge, Box, Button, Heading, Link, Text } from '@/system';
import { Layout, Content } from '@/components';
import type { Post } from '.contentlayer/types';

export const getStaticProps: GetStaticProps<TypeBlogPageProps> = async () => {
  return {
    props: {
      posts: publishedPosts,
    },
  };
};

type TypeBlogPageProps = { posts: ReadonlyArray<Post> };

export default function BlogPage({ posts }: TypeBlogPageProps) {
  return (
    <>
      <TitleAndMetaTags />

      <Layout.Main>
        <Content.Root>
          <Content.Header>
            <Heading level="1">Blog Posts</Heading>
          </Content.Header>

          <Content.Section
            css={{
              '> *': {
                my: '$6',
              },
            }}
          >
            {posts.map(({ slug, title, description }) => {
              return (
                <NextLink key={slug} href={`/blog/${slug}`} passHref prefetch={false}>
                  <Button key={slug} as={Link} css={{ display: 'block', p: '$5' }}>
                    <Heading level="2" css={{ mb: '$4' }}>
                      {title}
                    </Heading>
                    <Text css={{ lineHeight: '$2' }}>{description}</Text>
                  </Button>
                </NextLink>
              );
            })}
          </Content.Section>
        </Content.Root>
      </Layout.Main>
    </>
  );
}
