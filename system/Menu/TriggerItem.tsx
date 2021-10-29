import { styled, StitchesCss } from 'stitches.config';
import { TriggerItem as MenuTriggerItem } from '@radix-ui/react-dropdown-menu';
import { itemStyles } from './itemStyles';

const triggerItemStyles = {
  ...itemStyles,
  '&[data-state="open"]': {
    backgroundColor: '$teal4',
    color: '$teal11',
  },
};

export const TriggerItem = styled(MenuTriggerItem, triggerItemStyles);
