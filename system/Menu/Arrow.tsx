import { styled, StitchesCss } from 'stitches.config';
import { Arrow as MenuArrow } from '@radix-ui/react-dropdown-menu';

const arrowStyles: StitchesCss = {
  fill: '$gray7',
};

export const Arrow = styled(MenuArrow, arrowStyles);
