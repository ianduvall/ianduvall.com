import { StitchesCss } from '@/styles';

export const itemStyles = {
  all: 'unset',
  color: '$teal11',
  borderRadius: '$1',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: '$1',
  py: '$1',
  pr: '$3',
  pl: '$6',
  userSelect: 'none',

  '&[data-disabled]': {
    color: '$teal8',
    pointerEvents: 'none',
  },

  '&:focus': {
    backgroundColor: '$teal9',
    color: '$teal1',
  },
};
