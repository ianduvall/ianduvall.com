import { styled, StitchesCss } from '@/styles';
import { CheckboxItem as MenuCheckboxItem } from '@radix-ui/react-dropdown-menu';
import { itemStyles } from './itemStyles';

const checkboxItemStyles = { ...itemStyles };

export const CheckboxItem = styled(MenuCheckboxItem, checkboxItemStyles);
