import { allPosts } from '.contentlayer/data';

export const publishedPosts = allPosts.filter((post) =>
  process.env.NODE_ENV === 'development' ? true : !post.draft
);
