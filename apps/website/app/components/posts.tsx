import Link from "next/link";
import { getAllBlogPostData, formatDate } from "app/blog/helpers";

export async function BlogPosts({ recent }: { recent?: number }) {
	const blogPosts = await getAllBlogPostData();

	return (
		<div>
			{blogPosts
				.sort((a, b) => {
					return a.frontmatter.publishedAt < b.frontmatter.publishedAt ? 1 : -1;
				})
				.slice(0, recent)
				.map((post) => (
					<div className="mb-4 flex w-full flex-col space-x-0">
						<Link
							key={post.slug}
							className="flex flex-col space-y-1"
							href={`/blog/${post.slug}`}
						>
							<p className="tracking-tight text-gray-900 dark:text-gray-100">
								{post.frontmatter.title}
							</p>
						</Link>
						<p
							className="tabular-nums text-gray-600 dark:text-gray-400"
							style={{ textDecoration: "none" }}
						>
							{formatDate(post.frontmatter.publishedAt, true)}
						</p>
					</div>
				))}
		</div>
	);
}
