import { styled } from '@/styles';

export const Pre = styled('pre', {
  backgroundColor: '$gray2',
  borderRadius: '$3',
  fontFamily: '$mono',
  lineHeight: '$3',
  m: 0,
  p: '$4',
  'overflow-x': 'auto',
  position: 'relative',
  whiteSpace: 'pre',

  '& > code': {
    display: 'block',
  },
});
