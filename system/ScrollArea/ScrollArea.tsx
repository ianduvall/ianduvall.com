import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { styled } from '@/styles';

const SCROLLBAR_SIZE = 11;
const EXPANDED_SCROLLBAR_SIZE = 15;

export const Root = styled(ScrollAreaPrimitive.Root, {
  overflow: 'hidden',
  width: '100vw',
  height: '100vh',
});

export const Viewport = styled(ScrollAreaPrimitive.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});

export const Thumb = styled(ScrollAreaPrimitive.Thumb, {
  flex: 1,
  borderRadius: SCROLLBAR_SIZE,
  // increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },

  bg: '$teal7',

  '@motion': {
    transition: 'background 150ms ease-out',
  },
});

export const Scrollbar = styled(ScrollAreaPrimitive.Scrollbar, {
  display: 'flex',
  // ensures no selection
  userSelect: 'none',
  // disable browser handling of all panning and zooming gestures on touch devices
  touchAction: 'none',
  p: 2,
  bg: 'transparent',

  '&[data-orientation="vertical"]': {
    width: SCROLLBAR_SIZE,
  },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },

  '@hover': {
    '&:hover': {
      bg: '$teal5',
      '&[data-orientation="vertical"]': {
        width: EXPANDED_SCROLLBAR_SIZE,
      },
      '&[data-orientation="horizontal"]': {
        height: EXPANDED_SCROLLBAR_SIZE,
      },

      [`& ${Thumb}`]: {
        bg: '$teal8',
      },
    },
  },

  '@motion': {
    transition: 'background 150ms ease-out',
  },
});

export const Corner = styled(ScrollAreaPrimitive.Corner, {
  bg: '$gray7',
});
