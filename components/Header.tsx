import React from 'react';
import NextLink from 'next/link';
import { Box, Link, Text } from '@/system';
import { ColorThemeButton } from './ColorThemeButton';

export const Header = () => {
  return (
    <Box
      as="header"
      css={{
        bc: '$gray1',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        p: '$5',
      }}
    >
      <NextLink href="/" passHref>
        <Link variant="primary">
          <Text
            as={'h1'}
            css={{
              color: '$mint11',
              fontSize: '$5',
              textTransform: 'uppercase',
            }}
          >
            Ian Duvall
          </Text>
        </Link>
      </NextLink>
      <Box
        as="nav"
        css={{
          ml: 'auto',
          display: 'flex',
          alignItems: 'center',
          [`& ${Link}`]: {
            mr: '$5',
            '@bp1': {
              mr: '$6',
            },
            '@bp2': {
              mr: '$7',
            },
          },
        }}
      >
        <Link css={{ fontSize: '$3' }} href="/blog">
          Blog
        </Link>
        <ColorThemeButton />
      </Box>
    </Box>
  );
};
