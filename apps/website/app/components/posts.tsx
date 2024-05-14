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
					<Link
						key={post.slug}
						className="mb-4 flex flex-col space-y-1"
						href={`/blog/${post.slug}`}
					>
						<div className="flex w-full flex-col space-x-0">
							<p className="tracking-tight text-neutral-900 dark:text-neutral-100">
								{post.frontmatter.title}
							</p>
							<p className="tabular-nums text-neutral-600 dark:text-neutral-400">
								{formatDate(post.frontmatter.publishedAt, true)}
							</p>
						</div>
					</Link>
				))}
		</div>
	);
}
