import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssText } from 'stitches.config';

const FONT_FIRA_MONO = 'https://fonts.googleapis.com/css?family=Fira+Mono&display=swap';

export default class Document extends NextDocument {
  render() {
    const cssText = getCssText();

    return (
      <Html lang="en">
        <Head>
          {/* server render css */}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: cssText }} />

          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href={FONT_FIRA_MONO} rel="preload" as="style" />
          <link href={FONT_FIRA_MONO} rel="stylesheet" media="all" />
          <noscript>
            <link href={FONT_FIRA_MONO} rel="stylesheet" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
