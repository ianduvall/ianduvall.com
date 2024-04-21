import { notFound } from "next/navigation";
import { CustomMDX, compileMDXSlug } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";

interface PostParams {
	slug: string;
}
export async function generateStaticParams() {
	let posts = await getBlogPosts();

	return posts.map(
		(post): PostParams => ({
			slug: post.slug,
		}),
	);
}

export async function generateMetadata({ params }: { params: PostParams }) {
	let post = (await getBlogPosts()).find((post) => post.slug === params.slug);
	if (!post) {
		throw new Error("Post not found", {
			cause: params.slug,
		});
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata;
	let ogImage = image
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
			url: `${baseUrl}/blog/${post.slug}`,
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
}

export default async function Blog({ params }: { params: PostParams }) {
	const { slug } = params;
	const post = await compileMDXSlug(params);

	if (!post) {
		return notFound();
	}

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
			<h1 className="title font-semibold text-2xl tracking-tighter">
				{post.frontmatter.title}
			</h1>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.frontmatter.publishedAt)}
				</p>
			</div>
			<article className="prose">{post.content}</article>
		</section>
	);
}
