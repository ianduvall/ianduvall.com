import React from 'react';
import NextLink from 'next/link';
import { Badge, Box, Link, Text } from '@/system';
import type { Post } from '.contentlayer/types';

export const BlogCard = ({ post }: { post: Post }): JSX.Element => {
  return (
    <Box css={{ mt: '$4' }}>
      <NextLink href={`/blog/${post.slug}`} passHref>
        <Link>
          <Box css={{ display: 'flex' }}>
            <Text css={{ fontSize: '$4' }}>{post.title}</Text>
            {post.draft ? <Badge css={{ mx: '$2' }}>Draft</Badge> : null}
          </Box>

          {post.publishedDate ? (
            <Text
              as="time"
              css={{
                fontSize: '$1',
                fontFamily: '$mono',
                color: '$gray10',
              }}
            >
              {post.publishedDate}
            </Text>
          ) : null}
        </Link>
      </NextLink>
    </Box>
  );
};
