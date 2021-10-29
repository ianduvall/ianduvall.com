import { styled, StitchesCss } from 'stitches.config';
import { RadioGroup as MenuRadioGroup } from '@radix-ui/react-dropdown-menu';

const radioGroupStyles: StitchesCss = {};

export const RadioGroup = styled(MenuRadioGroup, radioGroupStyles);
