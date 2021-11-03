import { styled } from '@/styles';

const tag = 'a';

export const linkStyles = {
  alignItems: 'center',
  gap: '$1',
  flexShrink: 0,
  outline: 'none',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  textDecorationColor: '$gray4',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  lineHeight: 'inherit',

  '@hover': {
    '&:hover': {
      textDecorationLine: 'underline',
    },
  },
  '&:focus': {
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
    outlineRadius: '2px',
    textDecorationLine: 'none',
  },

  variants: {
    variant: {
      primary: {
        color: '$mint11',
        textDecorationColor: '$mint4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$mint7',
          },
        },
        '&:focus': {
          outlineColor: '$mint8',
        },
      },
      subtle: {
        color: '$loContrast',
        textDecorationLine: 'none',
        textDecorationColor: '$gray4',
        '&:focus': {
          outlineColor: '$gray8',
        },
      },
      contrast: {
        color: '$hiContrast',
        textDecorationColor: '$gray4',
        '@hover': {
          '&:hover': {
            textDecorationColor: '$gray7',
          },
        },
        '&:focus': {
          outlineColor: '$gray8',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'contrast',
  },
};

export const Link = styled(tag, linkStyles);
