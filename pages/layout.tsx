import React from 'react';
import { Box, Link, Text } from '@/system';
import { NavTray } from '@/components';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import * as Layout from '@/components/Layout';
import NextLink from 'next/link';

export default function LayoutPage() {
  return (
    <>
      <TitleAndMetaTags />

      <Layout.ContentNav>
        <Layout.NavHeader>
          <Text as="p" h="2">
            Layout
          </Text>
        </Layout.NavHeader>
        <Layout.NavContent>
          <NextLink passHref href="/blog">
            <Layout.NavItem as={Link}>Blog</Layout.NavItem>
          </NextLink>
          <NextLink passHref href="/layout">
            <Layout.NavItem as={Link}>Layout</Layout.NavItem>
          </NextLink>
          {new Array(25).fill(0).map((_, i) => (
            <Layout.NavItem key={i} tabIndex={0}>
              <Text>Nav item {i}</Text>
            </Layout.NavItem>
          ))}
        </Layout.NavContent>
      </Layout.ContentNav>

      <Layout.Content>
        <Layout.ContentHeader>
          <ScreenSize />
          <Box css={{ flex: 1 }} />
          <NavTray />
        </Layout.ContentHeader>

        {new Array(200).fill(0).map((_, i) => (
          <Text key={i}>Content item {i}</Text>
        ))}
      </Layout.Content>
    </>
  );
}

const ScreenSize = () => (
  <>
    <Text
      css={{
        display: 'none',
        '@mobile-only': {
          display: 'block',
        },
      }}
    >
      Mobile
    </Text>
    <Text
      css={{
        display: 'none',
        '@tablet-portrait-only': {
          display: 'block',
        },
      }}
    >
      Tablet Portrait
    </Text>
    <Text
      css={{
        display: 'none',
        '@tablet-landscape-only': {
          display: 'block',
        },
      }}
    >
      Tablet Landscape
    </Text>
    <Text
      css={{
        display: 'none',
        '@desktop-only': {
          display: 'block',
        },
      }}
    >
      Desktop
    </Text>
    <Text
      css={{
        display: 'none',
        '@widescreen-only': {
          display: 'block',
        },
      }}
    >
      Widescreen
    </Text>
  </>
);
