import { styled, StitchesCss } from '@/styles';
import { ItemIndicator as MenuItemIndicator } from '@radix-ui/react-dropdown-menu';

const itemIndicatorStyles = {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const ItemIndicator = styled(MenuItemIndicator, itemIndicatorStyles);
