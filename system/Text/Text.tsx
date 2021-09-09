import { styled } from 'stitches.config';

const textTag = 'span';

export const textStyles = {
  boxSizing: 'border-box',
  display: 'block',
  fontFamily: '$system',
  fontVariantNumeric: 'tabular-nums',
  fontSize: '$1',
  lineHeight: '$2',
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
    },
  },
  defaultVariants: {
    weight: 'normal',
  },
};

export const Text = styled(textTag, textStyles);
