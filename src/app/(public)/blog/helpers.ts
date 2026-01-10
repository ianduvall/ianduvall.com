import path from "node:path";
import fs from "node:fs/promises";
import { evaluateBlogPostMDX } from "src/app/(public)/blog/mdx";

const blogPostsDirPath = path.join(
	process.cwd(),
	"src",
	"app",
	"(public)",
	"blog",
	"posts",
);

const getMdxFilePaths = async (dirPath: string) => {
	const filePaths = await fs.readdir(dirPath);
	return filePaths.filter((name) => path.extname(name) === ".mdx");
};

const getBlogPostFilePaths = () => {
	return getMdxFilePaths(blogPostsDirPath);
};

export const getBlogPostSlugs = async () => {
	const blogPostFilePaths = await getBlogPostFilePaths();
	return blogPostFilePaths.map((name) =>
		path.basename(name, path.extname(name)),
	);
};

export const readBlogPostFileFromSlug = async (
	slug: string,
): Promise<string> => {
	const filePath = path.join(blogPostsDirPath, `${slug}.mdx`);
	return fs.readFile(filePath, "utf-8");
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

	return posts.filter(
		(post): post is BlogPostData => post.metadata.publishedAt !== null,
	);
};
