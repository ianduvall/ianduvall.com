import * as React from 'react';

import { styled, keyframes } from '@/styles';
import { Box, Link, Text } from '@/system';

const headerHeight = '4rem';
const footerHeight = '4rem';

const navWidth = '16rem';
const nav2Width = '16rem';

export const Container = styled(Box, {
  width: '100%',
  height: '100vh',
  position: 'relative',

  display: 'grid',
  gridTemplateAreas: `
    "header"
    "content"
    "footer"
  `,
  gridTemplateRows: `${headerHeight} auto ${footerHeight}`,
  gridTemplateColumns: `auto`,

  '@tablet-portrait-and-up': {
    gridTemplateAreas: `
      "header header"
      "nav2 content"
      "footer footer"
    `,
    gridTemplateColumns: `${nav2Width} auto`,
  },
  '@tablet-landscape-and-up': {},
  '@desktop-and-up': {
    gridTemplateAreas: `
      "header header header"
      "nav nav2 content"
      "footer footer footer"
    `,
    gridTemplateColumns: `${navWidth} ${nav2Width} auto`,
  },
});

export const Header = styled(Box, {
  gridArea: 'header',

  display: 'flex',
  alignItems: 'center',

  bg: '$gray2',
  borderWidth: '$2',
  borderBottomStyle: 'solid',
  borderColor: '$gray7',
});

export const Nav = styled(Box, {
  display: 'none',

  overflowY: 'scroll',

  bg: '$gray2',
  borderRightWidth: '$2',
  borderRightStyle: 'solid',
  borderColor: '$gray7',

  '@desktop-and-up': {
    display: 'block',
    gridArea: 'nav',
  },
});

export const Nav2 = styled(Box, {
  display: 'none',

  overflowY: 'scroll',

  bg: '$gray2',
  borderRightWidth: '$2',
  borderRightStyle: 'solid',
  borderColor: '$gray7',

  '@tablet-portrait-and-up': {
    display: 'block',
    gridArea: 'nav2',
  },
});

export const Content = styled(Box, {
  gridArea: 'content',

  overflowY: 'scroll',
});

export const Footer = styled(Box, {
  gridArea: 'footer',

  display: 'flex',
  alignItems: 'center',

  bg: '$gray2',
  borderWidth: '$2',
  borderTopStyle: 'solid',
  borderColor: '$gray7',
});

Container.toString = () => 'Layout.Container';
Container.toString = () => 'Layout.Header';
Nav.toString = () => 'Layout.Nav';
Nav2.toString = () => 'Layout.Nav2';
Content.toString = () => 'Layout.Content';
Footer.toString = () => 'Layout.Footer';
