import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { BlogCard } from '@/components/BlogCard';
import { getAllPosts } from '@/lib/posts';
import type { Post } from '@/types/post';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box, Link, Text } from '@/system';
import { Header } from '@/components/Header';

export const getStaticProps = async () => {
  const posts = (await getAllPosts())
    .sort(
      ({ post: a }, { post: b }) =>
        Number(new Date(b.publishedAt || 0)) - Number(new Date(a.publishedAt || 0))
    )
    .slice(0, 5)
    .map(({ post }) => post);

  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }: { posts: ReadonlyArray<Post> }) {
  return (
    <>
      <TitleAndMetaTags />
      <Header />

      <Box
        css={{
          maxWidth: '750px',
          mx: 'auto',
          px: '$5',
        }}
      >
        <Box
          css={{
            py: '$5',
          }}
        >
          <Text
            as="h2"
            css={{
              fontSize: '$4',
            }}
          >
            {"I'm a software engineer with a focus on web tech."}
          </Text>

          <Text as="p" css={{ fontSize: '$3', mt: '$5' }}>
            I work at{' '}
            <Link href="https://www.sproutsocial.com" target="_blank" rel="noopener noreferrer">
              Sprout Social
            </Link>{' '}
            {
              "as a Web Engineer on the Analytics team. If you've used Sprout Social's Reporting tools you've likely used software I wrote."
            }
          </Text>

          <Text as="p" css={{ fontSize: '$3', mt: '$5' }}>
            Currently based in Chicago.
          </Text>

          <Text as="p" css={{ fontSize: '$3', mt: '$5' }}>
            You can find me on{' '}
            <Link href="https://twitter.com/ianwmduvall" target="_blank" rel="noopener noreferrer">
              <VisuallyHidden>Twitter</VisuallyHidden>
              <TwitterLogoIcon aria-hidden />
            </Link>{' '}
            and{' '}
            <Link href="https://github.com/ianduvall" target="_blank" rel="noopener noreferrer">
              <VisuallyHidden>Github</VisuallyHidden>
              <GitHubLogoIcon aria-hidden />
            </Link>
            .
          </Text>

          <Text as="p" css={{ fontSize: '$3', mt: '$5' }}>
            This site is still a work in progress.
          </Text>
        </Box>

        <Box
          css={{
            p: '$4',
            border: '1px solid $gray11',
            borderRadius: '$3',
            '@bp1': {
              p: '$6',
            },
          }}
        >
          <Text
            as="h2"
            css={{
              fontSize: '$2',
              mb: '$4',
              mx: 'auto',
              '@bp1': {
                mb: '$5',
              },
            }}
          >
            Recent Blog Posts
          </Text>

          <Box as="ul" css={{ listStyle: 'none', pl: 0 }}>
            {posts.map((post) => (
              <Box as="li" key={post.title}>
                <BlogCard post={post} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
