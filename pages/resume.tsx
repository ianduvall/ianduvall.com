import React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { BlogCard } from '@/components/BlogCard';
import type { Post } from '@/types/post';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box, Link, Text } from '@/system';
import { Header } from '@/components/Header';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { Resume } from '@/components/Resume';

export default function Home({ posts }: { posts: ReadonlyArray<Post> }) {
  return (
    <>
      <TitleAndMetaTags />
      <Header />

      <Box
        css={{
          p: '$4',
          '@tablet-portrait-and-up': {
            p: '$5',
          },
          '@tablet-landscape-and-up': {
            p: '$6',
          },
        }}
      >
        <Resume />
      </Box>
    </>
  );
}
