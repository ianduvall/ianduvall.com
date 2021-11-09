import React from 'react';
import NextLink from 'next/link';
import { ArrowTopRightIcon, GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box, Icon, Link, Text } from '@/system';
import * as Layout from '@/components/Layout';
import { useCloseNav } from 'atoms/navAtom';

export const NavLinks = () => {
  const closeNav = useCloseNav();

  return (
    <Layout.NavContent css={{ gap: '$4', pb: '$4' }}>
      <Layout.NavGroup>
        <NextLink passHref href="/">
          <Layout.NavItem as={Link} onClick={closeNav}>
            Home
          </Layout.NavItem>
        </NextLink>
        <NextLink passHref href="/blog">
          <Layout.NavItem as={Link} onClick={closeNav}>
            Blog
          </Layout.NavItem>
        </NextLink>
        <NextLink passHref href="/layout">
          <Layout.NavItem as={Link} onClick={closeNav}>
            Layout
          </Layout.NavItem>
        </NextLink>
      </Layout.NavGroup>

      <Layout.NavGroup>
        <Layout.NavGroupHeader>Social</Layout.NavGroupHeader>
        <Layout.NavItem as={Link}>
          <Icon as={TwitterLogoIcon} size="md" css={{ mr: '$3' }} />
          Twitter
          <Icon as={ArrowTopRightIcon} size="md" css={{ ml: 'auto' }} />
        </Layout.NavItem>
        <Layout.NavItem as={Link}>
          <Icon as={GitHubLogoIcon} size="md" css={{ mr: '$3' }} />
          Github
          <Icon as={ArrowTopRightIcon} size="md" css={{ ml: 'auto' }} />
        </Layout.NavItem>
      </Layout.NavGroup>
    </Layout.NavContent>
  );
};
