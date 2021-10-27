import React from 'react';
import { IdProvider } from '@radix-ui/react-id';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Footer } from '@/components/Footer';
import { globalStyles } from '@/styles/global';
import { SystemProvider, ThemeProvider, Box } from '@/system';

function App({ Component, pageProps }: AppProps) {
  globalStyles();

  return (
    <SystemProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </SystemProvider>
  );
}

export default App;
