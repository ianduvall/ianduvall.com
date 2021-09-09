import { mapValues } from 'lodash';
import { green, mint, red, sage, teal, yellow, blue } from '@radix-ui/colors';
import type { gray } from '@radix-ui/colors';
import { semanticColors } from './semanticColors';

const sageGray: typeof gray = {
  gray1: sage.sage1,
  gray2: sage.sage2,
  gray3: sage.sage3,
  gray4: sage.sage4,
  gray5: sage.sage5,
  gray6: sage.sage6,
  gray7: sage.sage7,
  gray8: sage.sage8,
  gray9: sage.sage9,
  gray10: sage.sage10,
  gray11: sage.sage11,
  gray12: sage.sage12,
};

export const lightColors = {
  ...blue,
  ...sageGray,
  ...green,
  ...mint,
  ...red,
  ...teal,
  ...yellow,

  ...semanticColors,

  hiContrast: '$gray12',
  loContrast: '$gray11',
  highlight: 'hsla(200, 100%, 75%, .95)',
};
