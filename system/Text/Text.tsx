import { styled } from '@/styles';

export const Text = styled('span', {
  display: 'block',
  fontFamily: '$system',
  fontVariantNumeric: 'tabular-nums',

  variants: {
    weight: {
      bold: {
        fontStyle: 'bold',
        fontWeight: '600',
      },
      normal: {
        fontStyle: 'normal',
        fontWeight: '400',
      },
    },
  },
  defaultVariants: {
    weight: 'normal',
  },
});
