import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from '@/styles';

const animationTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

export const Root = styled(Dialog.Root, {});

export const Trigger = styled(Dialog.Trigger, {});

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.5 },
});
const overlayHide = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 0.5 },
});

export const Overlay = styled(Dialog.Overlay, {
  bg: '$gray1',
  position: 'fixed',
  inset: 0,

  '&[data-state=open]': {
    opacity: 0.5,
  },
  '&[data-state=closed]': {
    opacity: 0,
  },

  '@motion': {
    willChange: 'opacity',
    animationDuration: '100ms',
    animationTimingFunction,

    '&[data-state=open]': {
      animationName: `${overlayShow}`,
    },
    '&[data-state=closed]': {
      animationName: `${overlayHide}`,
    },
  },
});

const translateX = '-50%';
const contentShow = keyframes({
  '0%': {
    opacity: 0.5,
    transform: `translate(${translateX}, 120%)`,
  },
  '100%': {
    opacity: 1,
    transform: `translate(${translateX}, 0)`,
  },
});
const contentHide = keyframes({
  '0%': {
    opacity: 1,
    transform: `translate(${translateX}, 0)`,
  },
  '100%': {
    opacity: 0.5,
    transform: `translate(${translateX}, 100%)`,
  },
});

const translateY = '0';
const contentShowSide = keyframes({
  '0%': {
    opacity: 0.5,
    transform: `translate(120%, ${translateY})`,
  },
  '100%': {
    opacity: 1,
    transform: `translate(0, ${translateY})`,
  },
});
const contentHideSide = keyframes({
  '0%': {
    opacity: 1,
    transform: `translate(0, ${translateY})`,
  },
  '100%': {
    opacity: 0.5,
    transform: `translate(100%, ${translateY})`,
  },
});

export const Content = styled(Dialog.Content, {
  position: 'fixed',
  bottom: '0',

  // horizontal centering
  left: '50%',
  transform: `translate(${translateX}, 0)`,

  width: '100vw',
  maxWidth: '$tablet-landscape-max',
  maxHeight: '85vh',

  bg: '$gray2',
  color: '$hiContrast',

  '&[data-state=open]': {
    opacity: 1,
  },
  '&[data-state=closed]': {
    opacity: 0,
  },

  '&:focus': { outline: 'none' },
  '@motion': {
    willChange: 'transform, opacity',
    animationDuration: '300ms',
    animationTimingFunction,

    '&[data-state=open]': {
      animationName: `${contentShow}`,
    },
    '&[data-state=closed]': {
      animationName: `${contentHide}`,
    },
  },

  '@desktop-and-up': {
    $$width: '500px',
    width: '$$width',
    maxWidth: '$$width',
    right: 0,
    top: 0,
    maxHeight: '100vh',
    height: '100vh',
    left: 'initial',
    transform: 'none',

    '@motion': {
      '&[data-state=open]': {
        animationName: `${contentShowSide}`,
      },
      '&[data-state=closed]': {
        animationName: `${contentHideSide}`,
      },
    },
  },
});

export const Title = styled(Dialog.Title, {});

export const Description = styled(Dialog.Description, {});

export const Close = styled(Dialog.Close, {});
