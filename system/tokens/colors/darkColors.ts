import {
  greenDark,
  mintDark,
  redDark,
  sageDark,
  tealDark,
  yellowDark,
  blueDark,
} from '@radix-ui/colors';
import type { grayDark } from '@radix-ui/colors';
import { semanticColors } from './semanticColors';

const sageGrayDark: typeof grayDark = {
  gray1: sageDark.sage1,
  gray2: sageDark.sage2,
  gray3: sageDark.sage3,
  gray4: sageDark.sage4,
  gray5: sageDark.sage5,
  gray6: sageDark.sage6,
  gray7: sageDark.sage7,
  gray8: sageDark.sage8,
  gray9: sageDark.sage9,
  gray10: sageDark.sage10,
  gray11: sageDark.sage11,
  gray12: sageDark.sage12,
};

export const darkColors = {
  ...blueDark,
  ...sageGrayDark,
  ...greenDark,
  ...mintDark,
  ...redDark,
  ...tealDark,
  ...yellowDark,

  ...semanticColors,

  // inverting hi and lo contrast tokens in dark mode
  hiContrast: '$gray11',
  loContrast: '$gray12',
  highlight: 'hsla(200, 100%, 75%, .95)',
};
