import React from 'react';
import { Link, Text, SideNav, ScrollArea } from '@/system';
import { NavTray } from '@/components';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import * as Layout from '@/components/Layout';
import NextLink from 'next/link';

export default function LayoutPage() {
  return (
    <>
      <TitleAndMetaTags />

      {new Array(200).fill(0).map((_, i) => (
        <Text key={i}>Content item {i}</Text>
      ))}
    </>
  );
}

LayoutPage.getLayout = (page: React.ReactElement): React.ReactNode => (
  <Layout.Container>
    <Layout.Nav>
      <Layout.Header>
        <NavTray />
      </Layout.Header>
      <SideNav.Container>
        <NextLink passHref href="/blog">
          <Link as={SideNav.Item}>Blog</Link>
        </NextLink>
        {new Array(25).fill(0).map((_, i) => (
          <SideNav.Item key={i} tabIndex={0}>
            <Text>Nav item {i}</Text>
          </SideNav.Item>
        ))}
      </SideNav.Container>
    </Layout.Nav>

    <Layout.Nav2>
      {new Array(100).fill(0).map((_, i) => (
        <Text key={i}>Nav2 item {i}</Text>
      ))}
    </Layout.Nav2>

    <Layout.Content>
      <Layout.ContentHeader>
        <ScreenSize />
      </Layout.ContentHeader>
      {page}
    </Layout.Content>

    <Layout.Footer>
      <Text>Footer content goes here</Text>
    </Layout.Footer>
  </Layout.Container>
);

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
