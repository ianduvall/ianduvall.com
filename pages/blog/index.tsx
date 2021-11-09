import React from 'react';
import NextLink from 'next/link';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post } from '@/types/post';
import { GetStaticProps } from 'next';
import { Badge, Box, Link, Text } from '@/system';
import { NavTray } from '@/components';
import * as Layout from '@/components/Layout';

export const getStaticProps: GetStaticProps<TypeBlogPageProps> = async () => {
  let posts = (await getAllPosts())
    .sort(
      ({ post: a }, { post: b }) =>
        Number(new Date(b.publishedAt || 0)) - Number(new Date(a.publishedAt || 0))
    )
    .slice(0, 10)
    .map(({ post }) => post);

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

      <Layout.Content>
        <Layout.ContentHeader>
          <Box css={{ flex: 1 }} aria-hidden />
          <NavTray />
        </Layout.ContentHeader>

        <Box css={{ p: '$4' }}>
          {!posts.length ? (
            <Text as="h2" h={2}>
              Coming soon!
            </Text>
          ) : null}
          {posts.map(({ slug, title, excerpt, publishedAt }) => {
            return (
              <Box key={slug}>
                <Text>{title}</Text>
                <Text>{excerpt}</Text>
              </Box>
            );
          })}
        </Box>
      </Layout.Content>
    </>
  );
}
