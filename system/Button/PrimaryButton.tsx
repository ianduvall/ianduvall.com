import { styled } from 'stitches.config';
import merge from 'lodash.merge';

import { BaseButton, baseButtonStyles } from './BaseButton';

export const primaryButtonStyles = {
  backgroundColor: '$teal2',
  boxShadow: 'inset 0 0 0 1px $colors$teal7',
  color: '$teal11',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$teal8',
    },
  },
  '&:active': {
    backgroundColor: '$teal3',
    boxShadow: 'inset 0 0 0 1px $colors$teal8',
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$teal8, 0 0 0 1px $colors$teal8',
  },
};

export const PrimaryButton = styled(BaseButton, merge(baseButtonStyles, primaryButtonStyles));
