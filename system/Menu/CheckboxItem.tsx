import { styled, StitchesCss } from 'stitches.config';
import { CheckboxItem as MenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import { itemStyles } from './itemStyles';

const checkboxItemStyles: StitchesCss = { ...itemStyles };

export const CheckboxItem = styled(MenuCheckboxItem, checkboxItemStyles);
