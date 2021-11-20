import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { BlogCard } from '@/components/BlogCard';
import { publishedPosts } from '@/lib/posts';
import type { Post } from '.contentlayer/types';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box, Heading, Link, Text } from '@/system';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const getStaticProps = async () => {
  const posts = publishedPosts.slice(0, 5);

  return {
    props: {
      posts,
    },
  };
};

export default function HomePage({ posts }: { posts: ReadonlyArray<Post> }) {
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
        <Heading
          level="2"
          css={{
            my: '$6',
          }}
        >
          {"👋 I'm a software engineer working in web tech."}
        </Heading>

        <Text as="p" css={{ fontSize: '$3', my: '$6' }}>
          I work at{' '}
          <Link href="https://www.sproutsocial.com" target="_blank" rel="noopener noreferrer">
            Sprout Social
          </Link>{' '}
          {'as a Web Engineer on the Analytics team.'}
        </Text>

        <Text as="p" css={{ fontSize: '$3', my: '$6' }}>
          {"If you've used Sprout's Reporting tools you've likely used software I wrote."}
        </Text>

        <Text as="p" css={{ fontSize: '$3', my: '$6' }}>
          Currently based in Chicago.
        </Text>

        <Text as="p" css={{ fontSize: '$3', my: '$6' }}>
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

        <Text as="p" css={{ fontSize: '$3', my: '$6' }}>
          This site is still a work in progress.
        </Text>

        <Box
          css={{
            mt: '$8',
            mb: '$6',
            p: '$4',
            border: '1px solid $gray11',
            borderRadius: '$3',
            '@tablet-portrait-and-up': {
              p: '$6',
            },
          }}
        >
          <Heading
            level="2"
            css={{
              mb: '$4',
              '@tablet-portrait-and-up': {
                mb: '$5',
              },
            }}
          >
            Recent Blog Posts
          </Heading>

          <Box as="ul" css={{ listStyle: 'none', pl: 0 }}>
            {posts.map((post) => (
              <Box as="li" key={post.title}>
                <BlogCard post={post} />
              </Box>
            ))}
            {posts.length === 0 ? (
              <Text
                css={{
                  fontSize: '$1',
                  mb: '$4',
                  '@tablet-portrait-and-up': {
                    mb: '$5',
                  },
                }}
              >
                Coming soon!
              </Text>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
}

HomePage.getLayout = (page: React.ReactElement): React.ReactNode => (
  <Box
    css={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }}
  >
    <Box css={{ flex: 1 }}>{page}</Box>

    <Footer />
  </Box>
);
