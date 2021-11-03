import { styled, StitchesCss } from '@/styles';
import { Arrow as MenuArrow } from '@radix-ui/react-dropdown-menu';

const arrowStyles = {
  fill: '$gray7',
};

export const Arrow = styled(MenuArrow, arrowStyles);
