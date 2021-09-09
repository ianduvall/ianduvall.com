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
        '@bp1': {
          py: '$5',
        },
      }}
    >
      <Box
        css={{
          maxWidth: '720px',
          mx: '$4',
          py: '$4',
          '@bp1': {
            mx: '$5',
            py: '$5',
          },
          '@bp2': {
            mx: '$6',
          },
        }}
      >
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            '@bp1': { flexDirection: 'row' },
          }}
        >
          <Text
            as="h3"
            css={{
              css: {
                mb: '$4',
                color: '$gray800',
                '@bp1': {
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
              '@bp1': {
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
              '@bp1': {
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
              '@bp1': {
                mx: '$4',
              },
            }}
          >
            <Link href="https://github.com/ianduvall" target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </Text>

          <Text
            as="p"
            css={{
              mb: '$1',
              '@bp1': {
                mx: '$4',
              },
            }}
          >
            <Link href="https://twitter.com/ianwmduvall" target="_blank" rel="noopener noreferrer">
              Twitter
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
