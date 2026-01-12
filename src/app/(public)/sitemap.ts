import { baseUrl } from "src/app/shared";
import { getAllBlogPostData } from "./blog/helpers";

export default async function sitemap() {
	"use cache";
	const blogs = (await getAllBlogPostData()).map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.metadata.publishedAt,
	}));

	const routes = ["", "/blog"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
