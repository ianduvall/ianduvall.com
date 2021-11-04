import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { styled } from '@/styles';

const SCROLLBAR_SIZE = 11;

export const Root = styled(ScrollAreaPrimitive.Root, {
  overflow: 'hidden',
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

  bg: '$gray8',

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

  '&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
  '&[data-orientation="horizontal"]': {
    flexDirection: 'column',
    height: SCROLLBAR_SIZE,
  },

  bg: '$gray5',
  '@hover': {
    '&:hover': {
      bg: '$gray6',
      [`& ${Thumb}`]: {
        bg: '$gray9',
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
