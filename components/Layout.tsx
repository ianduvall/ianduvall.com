import * as React from 'react';

import { styled, keyframes } from '@/styles';
import { Box, Link, ScrollArea, Text } from '@/system';

const headerHeight = '4rem';

const navWidth = '16rem';
const nav2Width = '20rem';

export const Container = styled(Box, {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'auto',

  display: 'flex',
});

const Header = styled(Box, {
  position: 'sticky',
  top: 0,

  height: headerHeight,
  minHeight: headerHeight,
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
  px: '$4',

  bg: '$gray1',
});

export const NavHeader = styled(Header, {
  bg: '$gray2',
});

const StyledNavContainer = styled(ScrollArea.Root, {
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
StyledNavContainer.toString = () => 'Layout.StyledNavContainer';

export const Nav = styled(function Nav({ children }: { children: React.ReactNode }) {
  return (
    <StyledNavContainer>
      <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </StyledNavContainer>
  );
});

export const NavContent = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
});

export const NavGroup = styled(Box, {});

export const NavGroupHeader = styled(Text, {
  px: '$4',
  py: '$2',
  fontSize: '$1',
  color: '$gray9',
});

export const NavItem = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  px: '$4',
  py: '$3',
  color: '$gray11',
  fontSize: '$2',

  outline: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  textDecoration: 'none',

  '@hover': {
    '&:hover': {
      bg: '$gray5',
    },
  },
  '&:active': {
    backgroundColor: '$gray4',
  },
  '&:focus': {
    bg: '$gray5',
    boxShadow: '$borderFocus',
  },

  variants: {
    selected: {
      true: {
        bg: '$gray5',
      },
    },
  },
});

const StyledSecondaryNavContainer = styled(ScrollArea.Root, {
  display: 'none',

  width: nav2Width,
  overflowY: 'scroll',

  bg: '$gray2',
  borderRightWidth: '$2',
  borderRightStyle: 'solid',
  borderColor: '$gray7',

  '@tablet-landscape-and-up': {
    display: 'block',
  },
});
export const ContentNav = styled(function Nav({ children }: { children: React.ReactNode }) {
  return (
    <StyledSecondaryNavContainer>
      <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </StyledSecondaryNavContainer>
  );
});

export const Content = ({ children }: { children: React.ReactNode }) => (
  <ScrollArea.Root css={{ flex: 1 }}>
    <ScrollArea.Viewport>{children}</ScrollArea.Viewport>
    <ScrollArea.Scrollbar orientation="vertical">
      <ScrollArea.Thumb />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
);

export const ContentHeader = styled(Header, {});

Container.toString = () => 'Layout.Container';
Nav.toString = () => 'Layout.Nav';
NavHeader.toString = () => 'Layout.NavHeader';
Content.toString = () => 'Layout.Content';
ContentHeader.toString = () => 'Layout.ContentHeader';
