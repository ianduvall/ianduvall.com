import { styled } from 'stitches.config';
import { Item as MenuItem } from '@radix-ui/react-dropdown-menu';
import { itemStyles } from './itemStyles';

export const Item = styled(MenuItem, { ...itemStyles });
