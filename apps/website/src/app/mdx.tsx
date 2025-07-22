import React, { type ComponentProps, type JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";
import { evaluate, type EvaluateOptions } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";

const slugify = (input: React.ReactNode): string => {
	if (!input) return "";
	return input
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
};

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
	const Heading = ({ children, ...props }: ComponentProps<"h1">) => {
		const slug = slugify(children);
		const HeadingTag = `h${level}` as const;
		return (
			<HeadingTag id={slug} {...props}>
				<a href={`#${slug}`} className="anchor">
					{children}
				</a>
			</HeadingTag>
		);
	};

	return Heading;
};

const mdxComponents = {
	a: (props: ComponentProps<"a">) => {
		const href = props.href;

		if (href?.startsWith("/")) {
			return <Link href={href} {...props} />;
		}

		if (href?.startsWith("#")) {
			return <a {...props} />;
		}

		return <a target="_blank" rel="noopener noreferrer" {...props} />;
	},
	blockquote: (props: ComponentProps<"blockquote">) => (
		<blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />
	),
	code: ({ children, ...props }: ComponentProps<"code">) => {
		if (typeof children !== "string") {
			return <code {...props}>{children}</code>;
		}

		return (
			<code
				dangerouslySetInnerHTML={{ __html: highlight(children) }}
				{...props}
			/>
		);
	},
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: function RoundedImage(
		props: React.ComponentPropsWithoutRef<typeof Image>,
	) {
		return (
			<Image
				className={`rounded-lg ${props.className ?? ""}`}
				{...props}
				alt={props.alt}
			/>
		);
	},
} as const;

export interface BlogPostMetadata {
	title: string;
	publishedAt: string;
	summary: string;
	image?: string;
	draft?: true;
}

export const evaluateBlogPostMDX = async ({
	content,
}: {
	content: string;
}): Promise<readonly [JSX.Element, BlogPostMetadata]> => {
	const options: EvaluateOptions = {
		...jsxRuntime,
	};
	const { default: MDXContent, metadata } = await evaluate(content, {
		...options,
		remarkPlugins: [remarkGfm],
	});

	return [
		MDXContent({
			components: mdxComponents,
		}),
		metadata as BlogPostMetadata,
	] as const;
};
