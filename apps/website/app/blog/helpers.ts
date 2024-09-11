import path from "node:path";
import fs from "node:fs/promises";
import { evaluateBlogPostMDX } from "app/mdx";

const blogPostsDirPath = path.join(process.cwd(), "app", "blog", "posts");

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

export const getAllBlogPostData = async () => {
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

	return posts.filter((post) => !post.metadata.draft);
};

export const formatDate = (date: string, includeRelative = false) => {
	let currentDate = new Date();
	if (!date.includes("T")) {
		date = `${date}T00:00:00`;
	}
	let targetDate = new Date(date);

	let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
	let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
	let daysAgo = currentDate.getDate() - targetDate.getDate();

	let formattedDate = "";

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`;
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`;
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`;
	} else {
		formattedDate = "Today";
	}

	let fullDate = targetDate.toLocaleString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	if (!includeRelative) {
		return fullDate;
	}

	return `${fullDate} (${formattedDate})`;
};
