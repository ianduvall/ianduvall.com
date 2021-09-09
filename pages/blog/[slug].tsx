import React from 'react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { getMDXComponent } from 'mdx-bundler/client';
import TitleAndMetaTags from '@/components/TitleAndMetaTags';
import { MDXComponents } from '@/components/MdxComponents';
import { HomeLink } from '@/components/HomeLink';
import { text } from '@/styles/text';
import { box } from '@/styles/box';
import { container } from '@/styles/container';
import { link } from '@/styles/link';
import { badge } from '@/styles/badge';
import { divider } from '@/styles/divider';
import { Text } from '@/system';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Post, PostWithCode } from '@/types/post';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

export const getStaticPaths = async () => {
  const posts = await getAllPosts();

  return {
    fallback: false,
    paths: posts.map(({ post }) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string = (typeof params?.slug === 'string' ? params?.slug : params?.slug?.[0]) || '';
  const { code, frontmatter, post } = await getPostBySlug(slug);

  return {
    props: {
      code,
      post,
    },
  };
};

export default function PostPage({ code, post }: PostWithCode) {
  const { draft, publishedAtFormats, slug, title, description } = post;
  const MDXComponent = React.useMemo(() => getMDXComponent(code), [code]);

  const twitterShare = `
	https://twitter.com/intent/tweet?
	text="${title}" by @ianwmduvall
	&url=https://ianduvall.com/blog/${slug}
	`;

  const publishedDate = publishedAtFormats['MMMM dd, yyyy'];

  return (
    <div className={box({ bc: '$gray100', color: '$gray900' })}>
      <TitleAndMetaTags description={title} />

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

        <div className={text({ css: { display: 'flex', alignItems: 'center' } })}>
          <h1
            className={text({
              css: { fontSize: '$6' },
            })}
          >
            {title}
          </h1>
          {draft && <span className={badge({ variant: 'dark', css: { mx: '$2' } })}>Draft</span>}
        </div>

        <time
          className={text({
            css: {
              my: '$1',
              mx: 'auto',
              fontFamily: '$mono',
              color: '$gray800',
            },
          })}
        >
          {publishedDate}
        </time>

        {description ? (
          <p
            className={text({
              css: { fontSize: '$2' },
            })}
          >
            {description}
          </p>
        ) : null}

        <div className={box({ my: '$5' })}>
          <MDXComponent components={MDXComponents} />
        </div>

        <hr className={divider({ size: '1', css: { my: '$5', mb: '$5' } })} />

        <div className={box({ mb: '$5' })}>
          <p className={text({ css: { fontSize: '$4' } })}>
            Share this post on{' '}
            <a
              className={link()}
              href={twitterShare}
              target="_blank"
              rel="noopener noreferrer"
              title="Share this post on Twitter"
            >
              <TwitterLogoIcon />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
