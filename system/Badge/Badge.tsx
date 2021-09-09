import { styled } from 'stitches.config';

const badgeTag = 'span';

export const badgeStyles = {
  alignItems: 'center',
  appearance: 'none',
  backgroundColor: '$gray3',
  borderRadius: '$pill',
  borderWidth: '0',
  boxSizing: 'border-box',
  color: '$gray11',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: 'inherit',
  fontVariantNumeric: 'tabular-nums',
  fontSize: '$1',
  justifyContent: 'center',
  lineHeight: '1',
  outline: 'none',
  p: '$2',
  textDecoration: 'none',
  userSelect: 'none',
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',
  whiteSpace: 'nowrap',

  '&::before': {
    boxSizing: 'border-box',
    content: '""',
  },
  '&::after': {
    boxSizing: 'border-box',
    content: '""',
  },
  '&:disabled': {
    backgroundColor: '$gray3',
    pointerEvents: 'none',
    color: '$gray8',
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$gray8, 0 0 0 1px $colors$gray8',
  },
};

export const Badge = styled(badgeTag, badgeStyles);
