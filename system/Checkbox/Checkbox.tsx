import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import type { VariantProps } from '@stitches/react';
import { styled, StitchesCss } from '@/styles';
import { CheckIcon } from '@radix-ui/react-icons';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',

  alignItems: 'center',
  appearance: 'none',
  display: 'inline-flex',
  justifyContent: 'center',
  lineHeight: '$1',
  margin: '0',
  outline: 'none',
  padding: '0',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  color: '$hiContrast',
  boxShadow: 'inset 0 0 0 1px $colors$gray7',
  overflow: 'hidden',
  '@hover': {
    '&:hover': {
      boxShadow: 'inset 0 0 0 1px $colors$gray8',
    },
  },
  '&:focus': {
    outline: 'none',
    borderColor: '$mint7',
    boxShadow: 'inset 0 0 0 1px $colors$mint9, 0 0 0 1px $colors$mint9',
  },

  variants: {
    size: {
      '1': {
        width: '$5',
        height: '$5',
        borderRadius: '$1',
      },
      '2': {
        width: '$6',
        height: '$6',
        borderRadius: '$2',
      },
    },
  },
  defaultVariants: {
    size: '1',
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
});

type CheckboxPrimitiveProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;
type CheckboxVariants = VariantProps<typeof StyledCheckbox>;
export type CheckboxProps = CheckboxPrimitiveProps & CheckboxVariants & { css?: StitchesCss };

export const Checkbox = React.forwardRef<React.ElementRef<typeof StyledCheckbox>, CheckboxProps>(
  (props, forwardedRef) => (
    <StyledCheckbox {...props} ref={forwardedRef}>
      <StyledIndicator>
        <CheckIcon />
      </StyledIndicator>
    </StyledCheckbox>
  )
);
