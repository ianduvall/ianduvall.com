import React from 'react';
import { Box, Button, Link, Text } from '@/system';
import { MobileNavTray } from '@/components';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import * as Layout from '@/components/Layout';

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
    <Layout.Header>
      <MobileNavTray />
      <ScreenSize />
    </Layout.Header>

    <Layout.Nav>
      {new Array(100).fill(0).map((_, i) => (
        <Text key={i}>Nav item {i}</Text>
      ))}
    </Layout.Nav>

    <Layout.Nav2>
      {new Array(100).fill(0).map((_, i) => (
        <Text key={i}>Nav2 item {i}</Text>
      ))}
    </Layout.Nav2>

    <Layout.Content>{page}</Layout.Content>

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
        '@desktop-only': {
          display: 'block',
        },
      }}
    >
      Widescreen
    </Text>
  </>
);
