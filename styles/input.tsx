import { css } from 'stitches.config';

export const input = css({
  boxSizing: 'border-box',
  appearance: 'none',
  border: '1px solid $gray',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  margin: 0,
  py: '0',
  px: '$2',
  height: '$4',
  backgroundColor: 'transparent',
  color: '$gray900',
  fontFamily: '$system',
  fontSize: '$3',
  lineHeight: 1,
  width: '100%',

  '&:focus': {
    outline: 'none',
    borderColor: '$gray900',
  },
});
