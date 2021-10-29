import { styled, StitchesCss } from 'stitches.config';
import { RadioItem as MenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { itemStyles } from './itemStyles';

const radioItemStyles = { ...itemStyles };

export const RadioItem = styled(MenuRadioItem, radioItemStyles);
