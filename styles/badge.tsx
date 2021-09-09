import { css } from 'stitches.config';

export const badge = css({
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '$round',

  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: '$0',
  fontWeight: '500',
  height: '$3',
  px: '$2',
  display: 'inline-flex',
  alignItems: 'center',

  variants: {
    variant: {
      dark: {
        backgroundColor: '$gray800',
        color: '$gray100',
      },
      light: {
        bc: '$gray100',
        color: '$gray800',
      },
    },
  },
  defaultVariants: {
    variant: 'dark',
  },
});
