import React from 'react';
import NextLink from 'next/link';
import { Badge, Box, Link, Text } from '@/system';
import type { Post } from '@/types/post';

export const BlogCard = ({ post }: { post: Post }): JSX.Element => {
  return (
    <Box css={{ mt: '$4' }}>
      <NextLink href={`/blog/${post.slug}`} passHref>
        <Link
          css={{
            display: 'inline-block',
            lineHeight: '$3',
          }}
        >
          <Text css={{ fontSize: '$5', display: 'flex', alignItems: 'center' }}>
            {post.title} {post.draft && <Badge css={{ ml: '$2' }}>Draft</Badge>}
          </Text>

          {post.publishedAtFormats ? (
            <Text
              as="time"
              css={{
                fontSize: '$1',
                fontFamily: '$mono',
                color: '$gray200',
              }}
            >
              {post.publishedAtFormats['MMMM dd, yyyy']}
            </Text>
          ) : null}
        </Link>
      </NextLink>
    </Box>
  );
};
