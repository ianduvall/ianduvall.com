import { getAllBlogPostData } from "src/app/(public)/blog/helpers";
import { Link } from "src/app/components/link";
import { Fragment, ViewTransition } from "react";
import { FormattedDate } from "./formatted-date";

export async function BlogPosts({
	recent,
	viewTransitions = true,
}: {
	recent?: number;
	viewTransitions?: boolean;
}) {
	"use cache";
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
								<span className="text-sm italic">
									<FormattedDate date={post.metadata.publishedAt} />
								</span>
							</VT>
						</div>
					</div>
				))}
		</>
	);
}

export function LoadingBlogPost() {
	const heading = (
		<div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
	);
	const paragraph = (
		<div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
	);
	return (
		<div className="flex flex-col gap-3 opacity-80">
			{heading}
			{paragraph}
			{paragraph}
		</div>
	);
}
