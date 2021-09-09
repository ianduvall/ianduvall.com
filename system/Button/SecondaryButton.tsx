import { styled } from 'stitches.config';
import merge from 'lodash.merge';

import { BaseButton, baseButtonStyles } from './BaseButton';

export const secondaryButtonStyles = {
  backgroundColor: '$gray2',
  boxShadow: 'inset 0 0 0 1px $colors$gray7',
  color: '$gray11',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$gray8',
    },
  },
  '&:active': {
    backgroundColor: '$gray3',
    boxShadow: 'inset 0 0 0 1px $colors$gray8',
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$gray8, 0 0 0 1px $colors$gray8',
  },
};

export const SecondaryButton = styled(BaseButton, merge(baseButtonStyles, secondaryButtonStyles));
