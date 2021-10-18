import { styled } from 'stitches.config';

const DEFAULT_TAG = 'button';

export const buttonStyles = {
  alignItems: 'center',
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: '$untitled',
  fontSize: '$2',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 500,
  justifyContent: 'center',
  lineHeight: '1',
  margin: 0,
  overflow: 'visible',
  textTransform: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$teal2',
        boxShadow: 'inset 0 0 0 1px $colors$teal7',
        color: '$teal11',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$teal8',
          },
        },
        '&:active': {
          backgroundColor: '$teal3',
          boxShadow: 'inset 0 0 0 1px $colors$teal8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$teal8, 0 0 0 1px $colors$teal8',
        },
      },
      secondary: {
        backgroundColor: '$gray2',
        boxShadow: 'inset 0 0 0 1px $colors$gray7',
        color: '$gray11',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$gray8',
          },
        },
        '&:active': {
          backgroundColor: '$gray3',
          boxShadow: 'inset 0 0 0 1px $colors$gray8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$gray8, 0 0 0 1px $colors$gray8',
        },
      },
    },
    size: {
      sm: {
        borderRadius: '$1',
        fontSize: '$1',
        p: '$3',
      },
      md: {
        borderRadius: '$2',
        fontSize: '$3',
        p: '$4',
      },
      lg: {
        borderRadius: '$2',
        fontSize: '$4',
        p: '$5',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
};

export const Button = styled(DEFAULT_TAG, buttonStyles);
