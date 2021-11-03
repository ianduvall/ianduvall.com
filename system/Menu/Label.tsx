import { styled, StitchesCss } from '@/styles';
import { Label as MenuLabel } from '@radix-ui/react-dropdown-menu';

const labelStyles = {
  fontSize: '$-1',
  py: '$1',
  pr: '$2',
  pl: '$4',
  color: '$teal11',
};

export const Label = styled(MenuLabel, labelStyles);
