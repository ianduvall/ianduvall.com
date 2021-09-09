import React from 'react';
import NextLink from 'next/link';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { BlogCard } from '@/components/BlogCard';
import { text } from '@/styles/text';
import { box } from '@/styles/box';
import { container } from '@/styles/container';
import { link } from '@/styles/link';
import { badge } from '@/styles/badge';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post } from '@/types/post';
import { HomeLink } from '@/components/HomeLink';
import { GetStaticProps } from 'next';
import { Text } from '@/system';

export const getStaticProps: GetStaticProps<TypeBlogPageProps> = async () => {
  let posts = (await getAllPosts())
    .sort(
      ({ post: a }, { post: b }) =>
        Number(new Date(b.publishedAt || 0)) - Number(new Date(a.publishedAt || 0))
    )
    .slice(0, 10)
    .map(({ post }) => post);

  return {
    props: {
      posts,
    },
  };
};

type TypeBlogPageProps = { posts: ReadonlyArray<Post> };

export default function BlogPage({ posts }: TypeBlogPageProps) {
  return (
    <div>
      <TitleAndMetaTags description="Ramblings about tech and web development." />

      <div
        className={container({
          css: {
            mx: '$4',
            py: '$4',
            '@bp1': {
              mx: '$5',
              py: '$5',
            },
            '@bp2': {
              mx: '$6',
            },
          },
        })}
      >
        <div
          className={box({
            mb: '$4',
            '@bp1': {
              mb: '$5',
            },
          })}
        >
          <HomeLink>
            <Text
              as={'h1'}
              css={{
                color: '$mint11',
                fontSize: '$5',
                textTransform: 'uppercase',
              }}
            >
              Ian Duvall
            </Text>
          </HomeLink>
        </div>

        <h1
          className={text({
            css: { fontSize: '$6', mb: '$5', mx: 'auto' },
          })}
        >
          Weblog
        </h1>

        <ul className={box({ listStyle: 'none', pl: 0 })}>
          {posts.map((post) => {
            const { title, description, slug, publishedAtFormats, draft } = post;
            return (
              <div key={post.slug} className={box({ mt: '$4' })}>
                <NextLink href={`/blog/${slug}`} passHref>
                  <a
                    className={link({
                      variant: 'ghost',
                      css: {
                        display: 'inline-block',
                        lineHeight: '$3',
                      },
                    })}
                    aria-label={`Read ${title}`}
                  >
                    <span
                      className={text({
                        css: { fontSize: '$5', display: 'flex', alignItems: 'center' },
                      })}
                    >
                      {title}
                      {draft && (
                        <span
                          className={badge({
                            variant: 'dark',
                            css: { mx: '$2' },
                          })}
                        >
                          Draft
                        </span>
                      )}
                    </span>
                    {description ? (
                      <span
                        className={text({
                          css: { fontSize: '$1', display: 'block' },
                        })}
                      >
                        {description}
                      </span>
                    ) : null}

                    {publishedAtFormats['MMMM dd, yyyy'] ? (
                      <time
                        className={text({
                          css: {
                            fontSize: '$1',
                            fontFamily: '$mono',
                            color: '$gray800',
                          },
                        })}
                      >
                        {publishedAtFormats['MMMM dd, yyyy']}
                      </time>
                    ) : null}
                  </a>
                </NextLink>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
