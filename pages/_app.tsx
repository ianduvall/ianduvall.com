import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextLink from 'next/link';
import { IdProvider } from '@radix-ui/react-id';

import { Box, Link, SystemProvider, ThemeProvider } from '@/system';
import { globalStyles } from '@/styles/global';
import * as Layout from '@/components/Layout';
import { NavTray, ScreenSize, Providers } from '@/components';

type NextPageWithGetLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithGetLayout = AppProps & {
  Component: NextPageWithGetLayout;
};

export default function App({ Component, pageProps }: AppPropsWithGetLayout) {
  globalStyles();

  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <Providers>
      <Head>
        <title>Ian Duvall</title>
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </Providers>
  );
}

const getDefaultLayout = (page: React.ReactElement): React.ReactNode => (
  <Layout.Root>
    <Layout.Header>
      <NextLink href="/" passHref>
        <Link
          variant="primary"
          css={{
            color: '$mint11',
            fontSize: '$5',
          }}
        >
          iD
        </Link>
      </NextLink>
      <ScreenSize />

      <Box css={{ m: 'auto' }}></Box>

      <NavTray />
    </Layout.Header>

    {page}
  </Layout.Root>
);
