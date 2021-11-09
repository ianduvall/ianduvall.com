import { styled } from '@/styles';

export const Icon = styled('svg', {
  variants: {
    size: {
      sm: {
        height: '$4',
        width: '$4',
      },
      md: {
        height: '$5',
        width: '$5',
      },
      lg: {
        height: '$6',
        width: '$6',
      },
      xl: {
        height: '$7',
        width: '$7',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
