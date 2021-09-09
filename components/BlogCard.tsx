import React, { FC } from 'react';
import NextLink from 'next/link';
import { parseISO, format } from 'date-fns';
import { text } from '@/styles/text';
import { box } from '@/styles/box';
import { link } from '@/styles/link';
import { Badge } from '@/system';
import type { Post } from '@/types/post';

export const BlogCard = ({ post }: { post: Post }): JSX.Element => {
  return (
    <div className={box({ mt: '$4' })}>
      <NextLink href={`/blog/${post.slug}`} passHref>
        <a
          className={link({
            variant: 'ghost',
            css: {
              display: 'inline-block',
              lineHeight: '$3',
            },
          })}
          aria-label={`Read ${post.title}`}
        >
          <span
            className={text({ css: { fontSize: '$5', display: 'flex', alignItems: 'center' } })}
          >
            {post.title} {post.draft && <Badge css={{ ml: '$2' }}>Draft</Badge>}
          </span>

          {post.publishedAt ? (
            <time
              className={text({
                css: {
                  fontSize: '$1',
                  fontFamily: '$mono',
                  color: '$gray200',
                },
              })}
            >
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </time>
          ) : null}
        </a>
      </NextLink>
    </div>
  );
};
