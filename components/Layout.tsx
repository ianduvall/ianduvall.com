import * as React from 'react';

import { styled, keyframes } from '@/styles';
import { Box, ScrollArea } from '@/system';

const headerHeight = '4rem';
const footerHeight = '4rem';

const navWidth = '16rem';
const nav2Width = '16rem';

export const Container = styled(Box, {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'auto',

  display: 'flex',
});

export const Header = styled(Box, {
  position: 'sticky',
  top: 0,

  height: headerHeight,
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  px: '$4',

  bg: '$gray2',
});

export const Nav = styled(Box, {
  display: 'none',

  width: navWidth,
  overflowY: 'scroll',

  bg: '$gray2',
  borderRightWidth: '$2',
  borderRightStyle: 'solid',
  borderColor: '$gray7',

  '@desktop-and-up': {
    display: 'block',
  },
});

export const Nav2 = styled(Box, {
  display: 'none',

  overflowY: 'scroll',

  bg: '$gray2',
  borderRightWidth: '$2',
  borderRightStyle: 'solid',
  borderColor: '$gray7',
});

export const Content = ({ children }: { children: React.ReactNode }) => (
  <ScrollArea.Root css={{ flex: 1 }}>
    <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

export const ContentHeader = styled(Header, {
  position: 'sticky',
  top: 0,
});

export const Footer = styled(Box, {
  display: 'flex',
  alignItems: 'center',

  bg: '$gray2',
  borderWidth: '$2',
  borderTopStyle: 'solid',
  borderColor: '$gray7',

  '@tablet-landscape-and-up': {
    display: 'none',
  },
});

Container.toString = () => 'Layout.Container';
Container.toString = () => 'Layout.Header';
Nav.toString = () => 'Layout.Nav';
Nav2.toString = () => 'Layout.Nav2';
Content.toString = () => 'Layout.Content';
Footer.toString = () => 'Layout.Footer';
