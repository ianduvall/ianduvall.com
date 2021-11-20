import React from 'react';
import NextLink from 'next/link';
import { Box, Code, Heading, Link, Pre, Text } from '@/system';
import { IdProvider } from '@radix-ui/react-id';

export const MDXComponents = {
  // wrapper: ({ components, ...props }: any) => <IdProvider {...props} />,
  Box,
  h1: (props: any) => <Heading level="1" {...props} />,
  h2: (props: any) => <Heading level="2" {...props} />,
  h3: (props: any) => <Heading level="3" {...props} />,
  h4: (props: any) => <Heading level="4" {...props} />,
  h5: (props: any) => <Heading level="5" {...props} />,
  h6: (props: any) => <Heading level="6" {...props} />,
  p: (props: any) => <Text as="p" {...props} />,

  a: ({ href = '', ...props }) => {
    if (href.startsWith('http')) {
      return <Link href={href} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    return (
      <NextLink href={href} passHref>
        <Link {...props} />
      </NextLink>
    );
  },
  ul: (props: any) => <Box as="ul" css={{ mb: '$4' }} {...props} />,
  ol: (props: any) => <Box as="ol" css={{ mb: '$4' }} {...props} />,
  li: (props: any) => <Box as="li" css={{ fontSize: '$4', listStyleType: 'circle' }} {...props} />,
  strong: (props: any) => <Text as="strong" weight="bold" {...props} />,
  pre: Pre,
  code: Code,
};
