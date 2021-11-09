import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextLink from 'next/link';
import { IdProvider } from '@radix-ui/react-id';

import { Box, Text, Link, SystemProvider, ThemeProvider } from '@/system';
import { globalStyles } from '@/styles/global';
import * as Layout from '@/components/Layout';
import { NavLinks } from '@/components/NavLinks';

type NextPageWithGetLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithGetLayout = AppProps & {
  Component: NextPageWithGetLayout;
};

export default function App({ Component, pageProps }: AppPropsWithGetLayout) {
  globalStyles();

  const getLayout = Component.getLayout || getDefaultLayout;

  const page = getLayout(<Component {...pageProps} />);

  return (
    <SystemProvider>
      <ThemeProvider>
        <IdProvider>
          <Head>
            <title>Ian Duvall</title>
          </Head>

          {page}
        </IdProvider>
      </ThemeProvider>
    </SystemProvider>
  );
}

const getDefaultLayout = (page: React.ReactElement): React.ReactNode => (
  <Layout.Container>
    <Layout.Nav>
      <Layout.NavHeader>
        <NextLink href="/" passHref>
          <Link
            variant="primary"
            css={{
              color: '$mint11',
              fontSize: '$5',
            }}
          >
            Ian Duvall
          </Link>
        </NextLink>
      </Layout.NavHeader>

      <NavLinks />
    </Layout.Nav>

    {page}
  </Layout.Container>
);
