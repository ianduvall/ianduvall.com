import { getAllBlogPostData, formatDate } from "src/app/(public)/blog/helpers";
import { Link } from "src/app/components/link";

export async function BlogPosts({ recent }: { recent?: number }) {
	const blogPosts = await getAllBlogPostData();

	return (
		<>
			{blogPosts
				.sort((a, b) => {
					return a.metadata.publishedAt < b.metadata.publishedAt ? 1 : -1;
				})
				.slice(0, recent)
				.map((post) => (
					<div key={post.slug} className="flex flex-col">
						<Link href={`/blog/${post.slug}`}>
							<p className="text-lg tracking-tight text-gray-900 dark:text-gray-100">
								{post.metadata.title}
							</p>
						</Link>
						<p
							className="tabular-nums text-gray-600 dark:text-gray-400"
							style={{ textDecoration: "none !important" }}
						>
							{formatDate(post.metadata.publishedAt, true)}
						</p>
					</div>
				))}
		</>
	);
}
