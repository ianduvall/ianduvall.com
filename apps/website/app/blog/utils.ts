import fs from "node:fs/promises";
import path from "node:path";
import { PathLike } from "fs";

export interface BlogPostFrontmatter {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
}

function parseFrontmatter(fileContent: string) {
	let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	let match = frontmatterRegex.exec(fileContent);
	let frontMatterBlock = match?.[1] || "";
	let content = fileContent.replace(frontmatterRegex, "").trim();
	let frontMatterLines = frontMatterBlock.trim().split("\n");
	let metadata: Partial<BlogPostFrontmatter> = {};

	frontMatterLines.forEach((line) => {
		let [key = "", ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		metadata[key.trim() as keyof BlogPostFrontmatter] = value;
	});

	return { metadata: metadata as BlogPostFrontmatter, content };
}

async function getMDXFiles(dirPath: PathLike) {
	const dir = await fs.readdir(dirPath);
	return dir.filter((file: string) => path.extname(file) === ".mdx");
}

export async function readMDXFile(filePath: PathLike | fs.FileHandle) {
	const rawContent = await fs.readFile(filePath, "utf-8");

	return parseFrontmatter(rawContent);
}

async function getMDXData(dir: string): Promise<
	{
		// compiledMDX: CompileMDXResult<BlogPostFrontmatter>;
		metadata: BlogPostFrontmatter;
		slug: string;
		content: string;
	}[]
> {
	const mdxFiles = await getMDXFiles(dir);
	const mdxData = await Promise.all(
		mdxFiles.map((file: string) => readMDXFile(path.join(dir, file))),
	);

	return mdxData.map(({ metadata, content }, i) => {
		const file = mdxFiles[i] ?? "";
		const slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export function getBlogPosts(): ReturnType<typeof getMDXData> {
	return getMDXData(path.join(process.cwd(), "app", "blog", "posts"));
}

export function formatDate(date: string, includeRelative = false) {
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
}
