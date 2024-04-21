import React from "react";
import fs from "node:fs/promises";
import type { PathLike } from "node:fs";
import Link from "next/link";
import Image from "next/image";
import {
	MDXRemote,
	compileMDX,
	type CompileMDXResult,
} from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";
import { BlogPostFrontmatter } from "app/blog/utils";

interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {}
function CustomLink(props: LinkProps) {
	let href = props.href;

	if (href?.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href?.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentPropsWithoutRef<typeof Image>) {
	return <Image className={`rounded-lg ${props.className ?? ""}`} {...props} />;
}

interface CodeProps extends React.ComponentPropsWithoutRef<"code"> {}
function Code({ children, ...props }: CodeProps) {
	if (typeof children !== "string") {
		return <code {...props}>{children}</code>;
	}

	return (
		<code
			dangerouslySetInnerHTML={{ __html: highlight(children) }}
			{...props}
		/>
	);
}

function slugify(input: React.ReactNode): string {
	if (!input) return "";
	return input
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
	const Heading = ({ children }: { children?: React.ReactNode }) => {
		const slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	};

	return Heading;
}

const baseComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	code: Code,
} as const satisfies MDXRemoteProps["components"];

type MDXRemoteProps = React.ComponentPropsWithoutRef<typeof MDXRemote>;
export async function CustomMDX(props: MDXRemoteProps) {
	const components: MDXRemoteProps["components"] = props.components
		? { ...baseComponents, ...props.components }
		: baseComponents;

	return (
		<MDXRemote
			{...props}
			components={components}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkGfm],
				},
			}}
		/>
	);
}

export async function compileMDXFile(filePath: PathLike | fs.FileHandle) {
	const rawContent = await fs.readFile(filePath, "utf-8");
	const compiledMDX = await compileMDX<BlogPostFrontmatter>({
		source: rawContent,
		components: baseComponents,
		options: {
			parseFrontmatter: true,
			mdxOptions: {
				remarkPlugins: [remarkGfm],
			},
		},
	});

	return compiledMDX;
}

export const compileMDXSlug = async ({ slug }: { slug: string }) => {
	const filePath = `app/blog/posts/${slug}.mdx`;
	return compileMDXFile(filePath);
};
