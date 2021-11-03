import { styled, StitchesCss } from '@/styles';
import { Separator as MenuSeparator } from '@radix-ui/react-dropdown-menu';

const separatorStyles = {
  height: 1,
  backgroundColor: '$teal6',
  margin: 5,
};

export const Separator = styled(MenuSeparator, separatorStyles);
