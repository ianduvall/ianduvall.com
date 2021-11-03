import React from 'react';
import NextLink from 'next/link';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { Header } from '@/components/Header';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post } from '@/types/post';
import { GetStaticProps } from 'next';
import { Badge, Box, Link, Text } from '@/system';

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
    <Box>
      <TitleAndMetaTags description="Ramblings about tech and web development." />
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
        <Text as="h1" css={{ fontSize: '$6', mb: '$5', mx: 'auto' }}>
          Weblog
        </Text>

        {posts.length > 0 ? null : <Text>Coming Soon!</Text>}
        <Box as="ul" css={{ listStyle: 'none', pl: 0 }}>
          {posts.map((post) => {
            const { title, description, slug, publishedAtFormats, draft } = post;
            return (
              <Box key={post.slug} css={{ mt: '$4' }}>
                <NextLink href={`/blog/${slug}`} passHref>
                  <Link
                    css={{
                      display: 'inline-block',
                      lineHeight: '$3',
                    }}
                  >
                    <Text css={{ fontSize: '$5', display: 'flex', alignItems: 'center' }}>
                      {title}
                      {draft && <Badge css={{ mx: '$2' }}>Draft</Badge>}
                    </Text>
                    {description ? (
                      <Text css={{ fontSize: '$1', display: 'block' }}>{description}</Text>
                    ) : null}

                    {publishedAtFormats['MMMM dd, yyyy'] ? (
                      <Text
                        as="time"
                        css={{
                          fontSize: '$1',
                          fontFamily: '$mono',
                          color: '$gray800',
                        }}
                      >
                        {publishedAtFormats['MMMM dd, yyyy']}
                      </Text>
                    ) : null}
                  </Link>
                </NextLink>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
