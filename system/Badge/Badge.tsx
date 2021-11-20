import { styled } from '@/styles';
import { Button } from '../Button';

export const Badge = styled('span', {
  alignItems: 'center',
  alignSelf: 'flex-start',
  appearance: 'none',
  backgroundColor: '$gray3',
  borderRadius: '$pill',
  borderWidth: '0',
  color: '$gray11',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  fontVariantNumeric: 'tabular-nums',
  justifyContent: 'center',
  lineHeight: '1',
  outline: 'none',
  py: '$3',
  px: '$4',
  textDecoration: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  whiteSpace: 'nowrap',

  '&:disabled': {
    backgroundColor: '$gray3',
    pointerEvents: 'none',
    color: '$gray8',
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$gray8, 0 0 0 1px $colors$gray8',
  },
});
