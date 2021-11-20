import { allPosts } from '.contentlayer/data';

export const publishedPosts = allPosts.filter((post) => !post.draft);
