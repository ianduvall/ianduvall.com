import React from 'react';
import NextLink from 'next/link';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post } from '.contentlayer/types';
import { GetStaticProps } from 'next';
import { Badge, Box, Button, Heading, Link, Text } from '@/system';
import { NavTray } from '@/components';
import * as Layout from '@/components/Layout';

export const getStaticProps: GetStaticProps<TypeBlogPageProps> = async () => {
  let posts: Post[] = [];

  return {
    props: {
      posts,
    },
  };
};

type TypeBlogPageProps = { posts: ReadonlyArray<Post> };

export default function BlogPage({ posts }: TypeBlogPageProps) {
  return (
    <>
      <TitleAndMetaTags />

      <Layout.Main>
        <Heading level="1" css={{ mb: '$4' }}>
          Blog Posts
        </Heading>
        {posts.map(({ slug, frontmatter }) => {
          return (
            <NextLink key={slug} href={`/blog/${slug}`} passHref>
              <Button key={slug} as={Link} css={{ display: 'block', p: '$5' }}>
                <Heading level="2">{frontmatter.title}</Heading>
                <Text css={{ lineHeight: '$2' }}>{frontmatter.description}</Text>
              </Button>
            </NextLink>
          );
        })}
      </Layout.Main>
    </>
  );
}
