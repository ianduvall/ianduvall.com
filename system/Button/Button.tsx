import React from 'react';
import { styled, StitchesCss } from 'stitches.config';
import { useSystem } from '@/system';

const tag = 'button';

export const buttonStyles: StitchesCss = {
  alignItems: 'center',
  all: 'unset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: 0,
  fontFamily: '$untitled',
  fontSize: '$2',
  fontVariantNumeric: 'tabular-nums',
  fontWeight: 500,
  justifyContent: 'center',
  lineHeight: '1',
  margin: 0,
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
          boxShadow: 'inset 0 0 0 1px $colors$teal8, 0 0 0 1px $colors$teal8',
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
        fontSize: '$1',
        p: '$3',
      },
      md: {
        borderRadius: '$2',
        fontSize: '$3',
        p: '$4',
      },
      lg: {
        borderRadius: '$2',
        fontSize: '$4',
        p: '$5',
      },
    },
  },
  defaultVariants: {
    variant: 'secondary',
    size: 'md',
  },
};

const StyledButton = styled(tag, buttonStyles);

type ButtonProps = React.ComponentPropsWithRef<typeof StyledButton> & { css?: StitchesCss };

export const Button = React.forwardRef<React.ElementRef<typeof StyledButton>, ButtonProps>(
  function Button(props, forwardedRef) {
    const { isDisabled } = useSystem();
    const disabled = props.disabled === undefined ? isDisabled : props.disabled;

    return <StyledButton {...props} ref={forwardedRef} disabled={disabled} />;
  }
);
