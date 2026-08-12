import { evaluateBlogPostMDX } from "src/app/(public)/blog/mdx";

const mdxFileExtension = ".mdx";

const blogPostFileBytesByPath = import.meta.glob("./posts/*.mdx", {
	eager: true,
	import: "default",
}) as Record<string, Uint8Array>;

const utf8Decoder = new TextDecoder();

const getSlugFromFilePath = (filePath: string) => {
	const fileName = filePath.slice(filePath.lastIndexOf("/") + 1);
	return fileName.slice(0, -mdxFileExtension.length);
};

const blogPostFileContentsBySlug = new Map(
	Object.entries(blogPostFileBytesByPath)
		.map(
			([filePath, fileBytes]) =>
				[getSlugFromFilePath(filePath), utf8Decoder.decode(fileBytes)] as const,
		)
		.sort(([slugA], [slugB]) => slugA.localeCompare(slugB)),
);

export const getBlogPostSlugs = async () => {
	return [...blogPostFileContentsBySlug.keys()];
};

export const blogPostExistsForSlug = (slug: string) => {
	return blogPostFileContentsBySlug.has(slug);
};

export const readBlogPostFileFromSlug = async (slug: string): Promise<string> => {
	const fileContents = blogPostFileContentsBySlug.get(slug);

	if (fileContents === undefined) {
		throw new Error(`No blog post file found for slug "${slug}"`);
	}

	return fileContents;
};

export const compileBlogPostMDXFromSlug = async (slug: string) => {
	const content = await readBlogPostFileFromSlug(slug);
	return evaluateBlogPostMDX({ content });
};

interface BlogPostData {
	metadata: {
		title: string;
		publishedAt: string;
		summary: string;
		subtitle?: string | undefined;
		image?: string | undefined;
	};
	slug: string;
}
export const getAllBlogPostData = async (): Promise<BlogPostData[]> => {
	const slugs = await getBlogPostSlugs();
	const posts = await Promise.all(
		slugs.map(async (slug) => {
			const [, metadata] = await compileBlogPostMDXFromSlug(slug);
			return {
				metadata,
				slug,
			};
		}),
	);

	return posts.filter((post): post is BlogPostData => post.metadata.publishedAt !== null);
};
