import { Metadata } from "next";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { baseUrl } from "src/app/shared";
import {
	getBlogPostSlugs,
	blogPostExistsForSlug,
	compileBlogPostMDXFromSlug,
} from "src/app/(public)/blog/helpers";
import { Heading } from "src/app/components/heading";
import { Suspense, ViewTransition } from "react";
import { FormattedDate } from "../../components/formatted-date";

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
	cacheLife("max");

	try {
		const [, metadata] = await compileBlogPostMDXFromSlug(slug);
		return metadata;
	} catch {
		return null;
	}
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<PostParams>;
}): Promise<Metadata> => {
	const { slug } = await params;
	const postMetadata = await readBlogPostMetadata(slug);

	if (!postMetadata) {
		notFound();
	}

	const { title, publishedAt, summary: description, image } = postMetadata;

	const ogImage = image ? image : `${baseUrl}/og/${encodeURIComponent(title)}`;

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

export default function Blog({ params }: { params: Promise<PostParams> }) {
	return (
		<Suspense fallback={<LoadingBlogPost />}>
			<BlogPostFromParams params={params} />
		</Suspense>
	);
}

async function BlogPostFromParams({ params }: { params: Promise<PostParams> }) {
	const { slug } = await params;

	if (!blogPostExistsForSlug(slug)) {
		notFound();
	}

	return <BlogPost slug={slug} />;
}

async function BlogPost({ slug }: { slug: string }) {
	"use cache";
	cacheLife("max");

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
						image: image ? `${baseUrl}${image}` : `/og/${encodeURIComponent(title)}`,
						url: `${baseUrl}/blog/${slug}`,
						author: {
							"@type": "Person",
							name: "Ian Duvall",
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
						{publishedAt ? <FormattedDate date={publishedAt} /> : <div>Unpublished Draft</div>}
					</ViewTransition>
				</div>
			</section>

			{blogPost}
		</article>
	);
}

function LoadingBlogPost() {
	const line = <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />;

	return (
		<article className="prose">
			<span className="sr-only">Loading blog post...</span>
			<section className="heading-offset my-6 space-y-3">
				<div className="h-10 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
				<div className="h-6 w-3/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
				<div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</section>
			<div className="space-y-3">
				{line}
				{line}
				{line}
				<div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
			</div>
		</article>
	);
}
