import { css } from 'stitches.config';

export const text = css({
  boxSizing: 'border-box',
  fontFamily: '$system',
  lineHeight: 'inherit',
  margin: 0,

  variants: {
    weight: {
      bold: {
        fontStyle: 'normal',
        fontWeight: '600',
      },
      normal: {
        fontStyle: 'normal',
        fontWeight: '400',
      },
      medium: {
        fontStyle: 'normal',
        fontWeight: '500',
      },
    },
  },

  defaultVariants: {
    weight: 'medium',
  },
});
