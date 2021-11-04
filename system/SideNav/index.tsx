import { styled } from '@/styles';
import { Box, Link } from '@/system';

export const Container = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
});

export const Item = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  p: '$4',
  color: '$gray11',
  fontSize: '$1',

  outline: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  '@hover': {
    '&:hover': {
      bg: '$gray5',
    },
  },
  '&:active': {
    backgroundColor: '$gray4',
  },
  '&:focus': {
    bg: '$gray5',
    boxShadow: '$borderFocus',
  },

  variants: {
    selected: {
      true: {
        bg: '$gray5',
      },
    },
  },
});
