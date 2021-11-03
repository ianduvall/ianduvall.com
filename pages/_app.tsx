import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { IdProvider } from '@radix-ui/react-id';

import { Footer } from '@/components/Footer';
import { globalStyles } from '@/styles/global';
import { Box, SystemProvider, ThemeProvider } from '@/system';

const getDefaultLayout = (page: React.ReactElement): React.ReactNode => (
  <Box
    css={{
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    }}
  >
    <Box css={{ flex: 1 }}>{page}</Box>

    <Footer />
  </Box>
);

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
