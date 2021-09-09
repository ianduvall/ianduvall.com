import { styled } from 'stitches.config';

const DEFAULT_TAG = 'button';

export const baseButtonStyles = {
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
    size: 'md',
  },
};

export const BaseButton = styled(DEFAULT_TAG, baseButtonStyles);
