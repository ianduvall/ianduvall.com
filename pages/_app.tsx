import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import NextScript from 'next/script';
import { SessionProvider } from 'next-auth/react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { Box, Link } from '@/system';
import { globalStyles } from '@/styles/global';
import { ColorThemeButton, Layout, NavTray, Providers, ScreenSize } from '@/components';

type NextPageWithGetLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithGetLayout = AppProps & {
  Component: NextPageWithGetLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithGetLayout) {
  globalStyles();

  const getLayout = Component.getLayout || getDefaultLayout;

  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <NextScript
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="lazyOnload"
      ></NextScript>
      <NextScript id="ga-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </NextScript>

      <SessionProvider session={session}>
        <Providers>
          <Head>
            <title>Ian Duvall</title>
          </Head>

          {getLayout(<Component {...pageProps} />)}
        </Providers>
      </SessionProvider>
    </>
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

      <ColorThemeButton />
      <NavTray />
    </Layout.Header>

    {page}
  </Layout.Root>
);
