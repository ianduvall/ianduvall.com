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
                mb: '$5',
              },
            }}
          >
            {posts.map(
              ({ slug, title, description, publishedDate, draft, body, tags, readingTimeText }) => {
                return (
                  <NextLink key={slug} href={`/blog/${slug}`} passHref prefetch={false}>
                    <Button
                      key={slug}
                      as={Link}
                      css={{
                        display: 'block',
                        p: '$5',
                        '> :not(:last-child)': {
                          mb: '$5',
                        },
                        '@hover': {
                          '&:hover': {
                            textDecorationLine: 'none',
                          },
                        },
                      }}
                    >
                      <Heading level="2">{title}</Heading>
                      {description ? (
                        <Text as="p" css={{ fontSize: '$2' }}>
                          {description}
                        </Text>
                      ) : null}
                      <Box
                        css={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '$5' }}
                      >
                        {publishedDate ? (
                          <Text as="time" dateTime={publishedDate}>
                            {publishedDate}
                          </Text>
                        ) : null}
                        {readingTimeText ? <Text>{readingTimeText}</Text> : null}
                        {draft ? <Badge>Draft</Badge> : null}
                      </Box>
                      <Box
                        css={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '$5' }}
                      >
                        {tags?.map((tag) => (
                          <Button key={tag} as="span" badge>
                            #{tag}
                          </Button>
                        ))}
                      </Box>
                    </Button>
                  </NextLink>
                );
              }
            )}
          </Content.Section>
        </Content.Root>
      </Layout.Main>
    </>
  );
}
