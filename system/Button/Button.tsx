import React from 'react';
import { styled, StitchesCss } from '@/styles';
import { useSystem } from '@/system';

const tag = 'button';

export const buttonStyles = {
  alignItems: 'center',
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: 0,
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 500,
  justifyContent: 'center',
  lineHeight: '1',
  overflow: 'visible',
  textTransform: 'none',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0,0,0,0)',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$teal2',
        boxShadow: 'inset 0 0 0 1px $colors$teal7',
        color: '$teal11',
        '@hover': {
          '&:hover': {
            boxShadow: 'inset 0 0 0 1px $colors$teal8',
          },
        },
        '&:active': {
          backgroundColor: '$teal3',
          boxShadow: 'inset 0 0 0 1px $colors$teal8',
        },
        '&:focus': {
          boxShadow: 'inset 0 0 0 1px $colors$teal8',
        },
      },
      secondary: {
        backgroundColor: '$gray2',
        boxShadow: '$border',
        color: '$gray11',
        '@hover': {
          '&:hover': {
            boxShadow: '$borderHover',
          },
        },
        '&:active': {
          backgroundColor: '$gray3',
          boxShadow: '$borderActive',
        },
        '&:focus': {
          boxShadow: '$borderFocus',
        },
      },
    },
    size: {
      sm: {
        borderRadius: '$1',
        p: '$3',
      },
      md: {
        borderRadius: '$2',
        p: '$4',
      },
      lg: {
        borderRadius: '$2',
        p: '$5',
      },
    },
    badge: {
      true: {
        py: '$3',
        px: '$4',
        borderRadius: '$pill',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
};

export const StyledButton = styled(tag, buttonStyles);

type ButtonElement = React.ElementRef<typeof StyledButton>;
type ButtonProps = React.ComponentPropsWithRef<typeof StyledButton> & { css?: StitchesCss };

export const Button = React.forwardRef<ButtonElement, ButtonProps>(function Button(
  props: ButtonProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const { isDisabled } = useSystem();
  const disabled = props.disabled ?? isDisabled;

  return <StyledButton {...props} ref={forwardedRef} disabled={disabled} />;
}) as typeof StyledButton;

Button.toString = () => `.${StyledButton.className}`;
