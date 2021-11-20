import * as React from 'react';

import { styled, keyframes } from '@/styles';
import { Box, ScrollArea, Text } from '@/system';

const navWidth = '16rem';

const StyledNavContainer = styled(ScrollArea.Root, {
  display: 'none',

  width: navWidth,
  minWidth: navWidth,
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
  px: '$5',
  py: '$3',
  fontSize: '$1',
  color: '$gray9',
});

export const NavItem = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  px: '$5',
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
