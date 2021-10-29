import { styled } from 'stitches.config';

const textTag = 'span';

export const textStyles = {
  boxSizing: 'border-box',
  display: 'block',
  fontFamily: '$system',
  fontVariantNumeric: 'tabular-nums',
  fontSize: '$0',
  lineHeight: '$2',
  margin: 0,

  variants: {
    h: {
      1: {
        fontWeight: '$bold',
        fontSize: '$6',
      },
      2: {
        fontWeight: '$bold',
        fontSize: '$5',
      },
      3: {
        fontWeight: '$bold',
        fontSize: '$4',
      },
      4: {
        fontWeight: '$bold',
        fontSize: '$3',
      },
      5: {
        fontWeight: '$bold',
        fontSize: '$2',
      },
      6: {
        fontWeight: '$bold',
        fontSize: '$1',
      },
    },
    weight: {
      bold: {
        fontStyle: 'normal',
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
