import { Metadata } from "next";
import { notFound } from "next/navigation";
import { baseUrl } from "app/sitemap";
import {
	compileBlogPostMDXFromSlug,
	getBlogPostSlugs,
	formatDate,
} from "app/blog/helpers";

interface PostParams {
	slug: string;
}
export const generateStaticParams = async (): Promise<PostParams[]> => {
	console.log("generateStaticParams for /blog/[slug]/page");
	const slugs = await getBlogPostSlugs();

	return slugs.map((slug) => ({
		slug,
	}));
};

const readBlogPostFrontmatter = async (slug: string) => {
	try {
		const post = await compileBlogPostMDXFromSlug(slug);
		return post.frontmatter;
	} catch {
		throw notFound();
	}
};

export const generateMetadata = async ({
	params: { slug },
}: {
	params: PostParams;
}): Promise<Metadata> => {
	console.log("generateMetadata for /blog/[slug]/page", slug);

	const {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = await readBlogPostFrontmatter(slug);

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
			publishedTime,
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

export default async function Blog({ params }: { params: PostParams }) {
	console.log("render for /blog/[slug]/page");
	const { slug } = params;
	const post = await compileBlogPostMDXFromSlug(slug);

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.frontmatter.title,
						datePublished: post.frontmatter.publishedAt,
						dateModified: post.frontmatter.publishedAt,
						description: post.frontmatter.summary,
						image: post.frontmatter.image
							? `${baseUrl}${post.frontmatter.image}`
							: `/og?title=${encodeURIComponent(post.frontmatter.title)}`,
						url: `${baseUrl}/blog/${slug}`,
						author: {
							"@type": "Ian Duvall",
							name: "My Portfolio",
						},
					}),
				}}
			/>
			<h1 className="title text-2xl font-semibold tracking-tighter">
				{post.frontmatter.title}
			</h1>
			<div className="mb-8 mt-2 flex items-center justify-between text-sm">
				<p className="text-sm text-gray-600 dark:text-gray-400">
					{formatDate(post.frontmatter.publishedAt)}
				</p>
			</div>
			<article className="prose">{post.content}</article>
		</section>
	);
}
