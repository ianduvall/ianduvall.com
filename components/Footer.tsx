import React from 'react';
import NextLink from 'next/link';
import { Box, Link, Text } from '@/system';

export const Footer = (): JSX.Element => {
  return (
    <Box
      css={{
        py: '$4',
        bc: '$gray100',
        color: '$gray900',
      }}
    >
      <Box
        css={{
          maxWidth: '720px',
          p: '$4',
          '@tablet-portrait-and-up': {
            p: '$5',
          },
          '@tablet-landscape-and-up': {
            p: '$6',
          },
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            '@tablet-portrait-and-up': { flexDirection: 'row' },
          }}
        >
          <Text
            as="p"
            css={{
              css: {
                mb: '$4',
                color: '$gray800',
                '@tablet-portrait-and-up': {
                  mr: '$4',
                  mb: 0,
                },
              },
            }}
          >
            iD
          </Text>

          <Text
            as="p"
            css={{
              mb: '$1',
              '@tablet-portrait-and-up': {
                mx: '$4',
              },
            }}
          >
            <NextLink href="/blog" passHref>
              <Link>Blog</Link>
            </NextLink>
          </Text>

          <Text
            as="p"
            css={{
              mb: '$1',
              '@tablet-portrait-and-up': {
                mx: '$4',
              },
            }}
          >
            <Link href="/feed.xml">RSS</Link>
          </Text>

          <Text
            as="p"
            css={{
              mb: '$1',
              '@tablet-portrait-and-up': {
                mx: '$4',
              },
            }}
          >
            <Link href="/github" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Text>

          <Text
            as="p"
            css={{
              mb: '$1',
              '@tablet-portrait-and-up': {
                mx: '$4',
              },
            }}
          >
            <Link href="/twitter" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
