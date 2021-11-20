import React from 'react';
import type { VariantProps } from '@stitches/react';
import { Text } from '../Text';
import { StitchesCss } from '@/styles';
import merge from 'lodash.merge';

const DEFAULT_TAG = 'h1';

type HeadingLevel = '1' | '2' | '3' | '4' | '5' | '6';
type HeadingLevelVariants = { level: HeadingLevel } & VariantProps<typeof Text>;
type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingLevelVariants & { css?: StitchesCss; as?: keyof JSX.IntrinsicElements };

export const Heading = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, HeadingProps>(
  ({ level, css, ...props }, forwardedRef) => {
    let tag: `h${1 | 2 | 3 | 4 | 5 | 6}` = level ? `h${level}` : DEFAULT_TAG;
    let textCss: StitchesCss = { fontVariantNumeric: 'proportional-nums' };

    switch (level) {
      case '1':
        textCss.fontSize = '$7';
        break;
      case '2':
        textCss.fontSize = '$6';
        break;
      case '3':
        textCss.fontSize = '$5';
        break;
      case '4':
        textCss.fontSize = '$4';
        break;
      case '5':
        textCss.fontSize = '$3';
        break;
      case '6':
        textCss.fontSize = '$2';
        break;
    }

    return <Text as={tag} {...props} ref={forwardedRef} css={merge(textCss, css)} />;
  }
);
