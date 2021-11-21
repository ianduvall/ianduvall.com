import React from 'react';
import NextLink from 'next/link';
import { ArrowTopRightIcon, GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Box, Icon, Link, Text } from '@/system';
import * as Nav from '@/components/Nav';
import { useCloseNav } from 'atoms/navAtom';

const padding = {
  p: '$7',
  '@tablet-landscape-and-up': {
    p: '$5',
  },
};

export const NavLinks = () => {
  const closeNav = useCloseNav();

  return (
    <Nav.NavContent>
      <Nav.NavGroup>
        <NextLink passHref href="/">
          <Nav.NavItem as={Link} onClick={closeNav}>
            Home
          </Nav.NavItem>
        </NextLink>
        <NextLink passHref href="/blog">
          <Nav.NavItem as={Link} onClick={closeNav}>
            Blog
          </Nav.NavItem>
        </NextLink>
        <NextLink passHref href="/layout">
          <Nav.NavItem as={Link} onClick={closeNav}>
            Nav
          </Nav.NavItem>
        </NextLink>
      </Nav.NavGroup>

      <Nav.NavGroup>
        <Nav.NavGroupHeader>Social</Nav.NavGroupHeader>
        <Nav.NavItem as={Link}>
          <Icon as={TwitterLogoIcon} size="md" css={{ mr: '$3' }} />
          Twitter
          <Icon as={ArrowTopRightIcon} size="md" css={{ ml: 'auto' }} />
        </Nav.NavItem>
        <Nav.NavItem as={Link}>
          <Icon as={GitHubLogoIcon} size="md" css={{ mr: '$3' }} />
          Github
          <Icon as={ArrowTopRightIcon} size="md" css={{ ml: 'auto' }} />
        </Nav.NavItem>
      </Nav.NavGroup>
    </Nav.NavContent>
  );
};
