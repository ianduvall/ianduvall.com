import { styled } from '@/styles';

const textTag = 'span';

export const textStyles = {
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
};

export const Text = styled(textTag, textStyles);
