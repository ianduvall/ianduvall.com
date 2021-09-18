import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { IdProvider } from '@radix-ui/react-id';
import { useAnalytics } from '@/lib/analytics';
import { Footer } from '@/components/Footer';
import { globalStyles } from '@/styles/global';
import { Box } from '@/system';

function App({ Component, pageProps }: AppProps) {
  globalStyles();
  useAnalytics();

  return (
    <IdProvider>
      <Head>
        <title>Ian Duvall</title>
      </Head>

      <Box
        css={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Box css={{ flex: 1 }}>
          <Component {...pageProps} />
        </Box>

        <Footer />
      </Box>
    </IdProvider>
  );
}

export default App;
