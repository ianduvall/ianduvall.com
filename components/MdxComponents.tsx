import React from 'react';
import NextLink from 'next/link';
import NextRouter from 'next/router';
import NextImage from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';
import { pre } from '@/styles/pre';
import { code } from '@/styles/code';
import { Button } from '@/system';
import type { ComponentMap } from 'mdx-bundler/client';
import { Box, Link, Text } from '@/system';

export const MDXComponents: ComponentMap = {
  Box,
  h1: (props) => <Text as="h1" css={{ fontSize: '$6', mb: '$5' }} {...props} />,
  h2: (props) => (
    <Text as="h2" css={{ fontSize: '$5', mt: '$5', mb: '$4', mx: 'auto' }} {...props} />
  ),
  h3: (props) => (
    <Text as="h3" css={{ fontSize: '$4', mt: '$5', mb: '$3', mx: 'auto' }} {...props} />
  ),
  h4: (props) => (
    <Text
      as="h4"
      css={{ fontSize: '$3', textTransform: 'uppercase', mt: '$4', mb: '$3', mx: 'auto' }}
      {...props}
    />
  ),
  p: (props) => <Text as="p" css={{ fontSize: '$4', mb: '$4' }} {...props} />,

  a: ({
    // @ts-ignore
    href = '',
    ...props
  }) => {
    if (href.startsWith('http')) {
      return <Link href={href} target="_blank" rel="noopener noreferrer" {...props} />;
    }

    return (
      <NextLink href={href} passHref>
        <Link {...props} />
      </NextLink>
    );
  },
  ul: (props) => <Box as="ul" css={{ mb: '$4' }} {...props} />,
  ol: (props) => <Box as="ol" css={{ mb: '$4' }} {...props} />,
  li: (props) => (
    <Box as="li" css={{ fontSize: '$4', color: '$copy', listStyleType: 'circle' }} {...props} />
  ),
  strong: (props) => (
    <Text
      as="strong"
      weight="bold"
      css={{ fontSize: 'inherit', lineHeight: 'inherit' }}
      {...props}
    />
  ),
  Image: ({ children, ...props }) => (
    <Box as="figure" css={{ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } }}>
      <NextImage {...(props as any)} />
      {children && (
        <Box
          as="figcaption"
          css={{
            textAlign: 'center',
            fontSize: '$1',
            lineHeight: 1,
            fontFamily: '$mono',
            color: '$gray800',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  ),
  img: ({ children, ...props }) => (
    <Box css={{ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } }}>
      <NextImage {...(props as any)} />
    </Box>
  ),
  video: (props) => (
    <Box
      css={{
        my: '$4',
        mx: '-$3',
        border: '1px solid $gray3',
        overflow: 'hidden',
        '@bp1': { mx: '-$5' },
      }}
    >
      <Box
        as="video"
        {...props}
        autoPlay
        playsInline
        muted
        loop
        css={{ width: '100%', display: 'block' }}
      ></Box>
    </Box>
  ),
  iframe: ({ ...props }) => (
    <Box css={{ mb: '$4' }}>
      <iframe {...props} />
    </Box>
  ),
  blockquote: (props) => (
    <Box
      as="blockquote"
      css={{
        my: '$4',
        pl: '$2',
        borderLeft: '2px solid $gray',
        color: '$gray800',
        '@bp1': {
          pl: '$4',
        },
      }}
      {...props}
    />
  ),
  // @ts-ignore
  pre: ({ children, theme, showLineNumbers, ...props }) => {
    return (
      <pre
        className={pre({
          theme,
          showLineNumbers: typeof showLineNumbers === 'string',
          css: {
            mx: '-$4',
            mt: '$3',
            mb: '$5',

            '[data-preview] + &': {
              marginTop: '0',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },

            '@bp1': {
              mx: 0,
              borderRadius: '$3',
            },
          },
        })}
      >
        {children}
      </pre>
    );
  },
  // @ts-ignore
  code: ({ children, id, collapsible, className }) => {
    const isCollapsible = typeof collapsible !== 'undefined';
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = React.useState<boolean>(!isCollapsible);
    const isInline = typeof children === 'string';
    const content = (
      <code className={`${className} ${isInline ? code() : ''}`} id={id}>
        {children}
      </code>
    );
    return isCollapsible ? (
      <Collapsible.Root defaultOpen={isOpen} onOpenChange={(prev) => setIsOpen(!prev)}>
        <Collapsible.Trigger
          // @ts-ignore
          as={Button}
          css={{
            display: 'block',
            ml: 'auto',
            color: '$gray1',
            borderRadius: '$2',
            fontSize: '$2',
            borderColor: '$gray700',
            fontFamily: '$mono',
            '&:hover': { borderColor: '$gray1' },
          }}
        >
          {isOpen ? 'Hide' : 'Show'} code
        </Collapsible.Trigger>
        <Collapsible.Content>{content}</Collapsible.Content>
      </Collapsible.Root>
    ) : (
      content
    );
  },
  // @ts-ignore
  RegisterLink: ({ id, index, href }) => {
    const isExternal = href.startsWith('http');

    React.useEffect(() => {
      const codeBlock = document.getElementById(id);
      if (!codeBlock) return;

      const allHighlightWords = codeBlock.querySelectorAll('.highlight-word');
      const target = allHighlightWords[index - 1];
      if (!target) return;

      target.replaceWith(
        Object.assign(document.createElement('a'), {
          href,
          innerHTML: target.innerHTML,
          className: target.className,
          ...(isExternal ? { target: '_blank', rel: 'noopener' } : {}),
        })
      );
    }, [href, id, index, isExternal]);

    return null;
  },
  // @ts-ignore
  H: ({ id, index, ...props }) => {
    return <code className={code({ css: { cursor: 'default' } })} {...props} />;
  },
};
