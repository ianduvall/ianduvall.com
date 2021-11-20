import * as React from 'react';

import { styled, keyframes } from '@/styles';
import { Box, Link, ScrollArea, Text } from '@/system';

const headerHeight = '6rem';
const headerWidth = 'calc($5 + $5 + 40px)';

export const Root = ({ children }: { children: React.ReactNode }) => (
  <ScrollArea.Root
    css={{
      px: '$5',

      '@tablet-landscape-and-up': {
        px: headerWidth,
      },
    }}
  >
    <ScrollArea.Viewport asChild>
      <Box
        css={{
          gap: '$5',

          '@tablet-landscape-and-up': {
            display: 'flex',
            minHeight: '100vh',
          },
        }}
      >
        {children}
      </Box>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

export const Header = styled('header', {
  height: headerHeight,
  minHeight: 0,

  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$4',

  bg: '$gray1',

  '@tablet-landscape-and-up': {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: headerWidth,
    minWidth: headerWidth,
    height: '100vh',
    minHeight: '100vh',
    flexDirection: 'column',
    p: '$5',
    m: '0',
  },
});

export const Main = styled('main', {
  flex: '1 1 0',

  position: 'relative',
});

Root.toString = () => 'Layout.Root';
Header.toString = () => 'Layout.Header';
Main.toString = () => 'Layout.Main';
