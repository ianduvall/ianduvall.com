import { getAllBlogPostData, formatDate } from "src/app/(public)/blog/helpers";
import { Link } from "src/app/components/link";
import { Fragment, ViewTransition } from "react";

export async function BlogPosts({
	recent,
	viewTransitions = true,
}: {
	recent?: number;
	viewTransitions?: boolean;
}) {
	const blogPosts = await getAllBlogPostData();

	const VT = viewTransitions ? ViewTransition : Fragment;

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
							<VT name={`blog-title-${post.slug}`}>
								<p className="text-xl tracking-tight text-gray-900 dark:text-gray-100">
									{post.metadata.title}
								</p>
							</VT>
						</Link>
						<div className="text-gray-700 dark:text-gray-300">
							{post.metadata.subtitle ? (
								<VT name={`blog-subtitle-${post.slug}`}>
									<p>{post.metadata.subtitle}</p>
								</VT>
							) : null}
							<VT name={`blog-date-${post.slug}`}>
								<time
									dateTime={post.metadata.publishedAt}
									className="text-sm italic"
								>
									{formatDate(post.metadata.publishedAt, true)}
								</time>
							</VT>
						</div>
					</div>
				))}
		</>
	);
}
