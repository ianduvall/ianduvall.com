import { cacheLife } from "next/cache";
import { baseUrl } from "src/app/shared";
import { getAllBlogPostData } from "./blog/helpers";

export default async function sitemap() {
	"use cache";
	cacheLife("max");

	const blogPosts = await getAllBlogPostData();

	const blogs = blogPosts.map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const mostRecentPublishedAt = blogPosts.reduce(
		(latest, post) => (post.metadata.publishedAt > latest ? post.metadata.publishedAt : latest),
		"",
	);

	const routes = ["", "/blog"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: mostRecentPublishedAt,
	}));

	return [...routes, ...blogs];
}
