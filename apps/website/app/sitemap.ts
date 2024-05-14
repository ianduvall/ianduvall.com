import { getAllBlogPostData } from "./blog/helpers";

export const baseUrl = "https://www.ianduvall.com";

export default async function sitemap() {
	let blogs = (await getAllBlogPostData()).map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.frontmatter.publishedAt,
	}));

	let routes = ["", "/blog"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
