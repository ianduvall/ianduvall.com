import React from 'react';
import NextLink from 'next/link';
import NextRouter from 'next/router';
import NextImage from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';
import { text } from '@/styles/text';
import { box } from '@/styles/box';
import { link } from '@/styles/link';
import { pre } from '@/styles/pre';
import { divider } from '@/styles/divider';
import { code } from '@/styles/code';
import { SecondaryButton } from '@/system';
import type { ComponentMap } from 'mdx-bundler/client';

export const MDXComponents: ComponentMap = {
  Box: ({ css, as: Comp = 'div', ...props }: any) => <Comp className={box(css)} {...props} />,
  h1: (props) => <h1 className={text({ css: { fontSize: '$6', mb: '$5' } })} {...props} />,
  h2: (props) => (
    <h2
      className={text({
        weight: 'bold',
        css: { fontSize: '$5', mt: '$5', mb: '$4', mx: 'auto' },
      })}
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className={text({
        weight: 'bold',
        css: { fontSize: '$4', mt: '$5', mb: '$3', mx: 'auto' },
      })}
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className={text({
        weight: 'bold',
        css: { fontSize: '$3', textTransform: 'uppercase', mt: '$4', mb: '$3', mx: 'auto' },
      })}
      {...props}
    />
  ),
  p: (props) => (
    <p
      className={text({ weight: 'normal', css: { fontSize: '$4', mb: '$4', color: '$copy' } })}
      {...props}
    />
  ),

  a: ({
    // @ts-ignore
    href = '',
    ...props
  }) => {
    if (href.startsWith('http')) {
      return (
        <a className={link()} href={href} target="_blank" rel="noopener noreferrer" {...props} />
      );
    }

    return (
      <NextLink href={href} passHref>
        <a className={link()} {...props} />
      </NextLink>
    );
  },
  hr: (props) => <hr className={divider({ size: '1', css: { my: '$5' } })} {...props} />,
  ul: (props) => <ul className={box({ mb: '$4' })} {...props} />,
  ol: (props) => <ol className={box({ mb: '$4' })} {...props} />,
  li: (props) => (
    <li
      className={text({ css: { fontSize: '$4', color: '$copy', listStyleType: 'circle' } })}
      {...props}
    />
  ),
  strong: (props) => (
    <strong
      className={text({ weight: 'bold', css: { fontSize: 'inherit', lineHeight: 'inherit' } })}
      {...props}
    />
  ),
  Image: ({ children, ...props }) => (
    <figure className={box({ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } })}>
      <NextImage {...(props as any)} />
      {children && (
        <figcaption
          className={box({
            textAlign: 'center',
            fontSize: '$1',
            lineHeight: 1,
            fontFamily: '$mono',
            color: '$gray800',
          })}
        >
          {children}
        </figcaption>
      )}
    </figure>
  ),
  img: ({ children, ...props }) => (
    <div className={box({ my: '$5', mx: '-$3', '@bp1': { mx: '-$5' } })}>
      <NextImage {...(props as any)} />
    </div>
  ),
  video: (props) => (
    <div
      className={box({
        my: '$4',
        mx: '-$3',
        border: '1px solid $gray',
        overflow: 'hidden',
        '@bp1': { mx: '-$5' },
      })}
    >
      <video
        {...props}
        autoPlay
        playsInline
        muted
        loop
        className={box({ width: '100%', display: 'block' })}
      ></video>
    </div>
  ),
  iframe: ({ ...props }) => (
    <div className={box({ mb: '$4' })}>
      <iframe {...props} />
    </div>
  ),
  blockquote: (props) => (
    <blockquote
      className={box({
        my: '$4',
        pl: '$2',
        borderLeft: '2px solid $gray',
        color: '$gray800',
        '@bp1': {
          pl: '$4',
        },
      })}
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
          as={SecondaryButton}
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
