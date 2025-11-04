import { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseUrl } from "src/app/shared";
import {
	getBlogPostSlugs,
	formatDate,
	compileBlogPostMDXFromSlug,
} from "src/app/(public)/blog/helpers";
import { Heading } from "src/app/components/heading";
import { ViewTransition } from "react";

interface PostParams {
	slug: string;
}
export const generateStaticParams = async (): Promise<PostParams[]> => {
	const slugs = await getBlogPostSlugs();

	return slugs.map((slug) => ({
		slug,
	}));
};

const readBlogPostMetadata = async (slug: string) => {
	"use cache";
	try {
		const [, metadata] = await compileBlogPostMDXFromSlug(slug);
		return metadata;
	} catch {
		throw notFound();
	}
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<PostParams>;
}): Promise<Metadata> => {
	const { slug } = await params;
	const {
		title,
		publishedAt,
		summary: description,
		image,
	} = await readBlogPostMetadata(slug);

	const ogImage = image
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime: publishedAt || undefined,
			url: `${baseUrl}/blog/${slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
};

export default async function Blog({
	params,
}: {
	params: Promise<PostParams>;
}) {
	"use cache";
	const { slug } = await params;
	const [blogPost, { title, subtitle, publishedAt, summary, image }] =
		await compileBlogPostMDXFromSlug(slug);

	return (
		<article className="prose">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: title,
						datePublished: publishedAt,
						dateModified: publishedAt,
						description: summary,
						image: image
							? `${baseUrl}${image}`
							: `/og?title=${encodeURIComponent(title)}`,
						url: `${baseUrl}/blog/${slug}`,
						author: {
							"@type": "Ian Duvall",
							name: "My Portfolio",
						},
					}),
				}}
			/>

			<section className="heading-offset my-6">
				<ViewTransition name={`blog-title-${slug}`}>
					<Heading
						level={1}
						className="heading-offset text-4xl font-semibold tracking-tighter text-balance md:mx-0"
					>
						{title}
					</Heading>
				</ViewTransition>
				<div className="text-gray-700 dark:text-gray-300">
					<ViewTransition name={`blog-subtitle-${slug}`}>
						<p className="my-1 text-lg">{subtitle}</p>
					</ViewTransition>
					<ViewTransition name={`blog-date-${slug}`}>
						{publishedAt ? (
							<time dateTime={publishedAt}>
								{formatDate(publishedAt, true)}
							</time>
						) : (
							<div>Unpublished Draft</div>
						)}
					</ViewTransition>
				</div>
			</section>

			{blogPost}
		</article>
	);
}
