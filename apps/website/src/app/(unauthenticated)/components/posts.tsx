import Link from "next/link";
import {
	getAllBlogPostData,
	formatDate,
} from "src/app/(unauthenticated)/blog/helpers";

export async function BlogPosts({ recent }: { recent?: number }) {
	const blogPosts = await getAllBlogPostData();

	return (
		<div>
			{blogPosts
				.sort((a, b) => {
					return a.metadata.publishedAt < b.metadata.publishedAt ? 1 : -1;
				})
				.slice(0, recent)
				.map((post) => (
					<div key={post.slug} className="mb-4 flex w-full flex-col space-x-0">
						<Link
							className="flex flex-col space-y-1"
							href={`/blog/${post.slug}`}
						>
							<p className="tracking-tight text-gray-900 dark:text-gray-100">
								{post.metadata.title}
							</p>
						</Link>
						<p className="tabular-nums text-gray-600 dark:text-gray-400">
							{formatDate(post.metadata.publishedAt, true)}
						</p>
					</div>
				))}
		</div>
	);
}
