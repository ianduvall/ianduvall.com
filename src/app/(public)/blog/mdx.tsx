import React, { type ComponentProps, type JSX } from "react";
import Image from "next/image";
import { highlight } from "sugar-high";
import remarkGfm from "remark-gfm";
import { evaluate } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import { z } from "zod";
import { cacheLife, cacheTag } from "next/cache";
import { Heading } from "src/app/components/heading";
import { Link } from "src/app/components/link";

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
	return function H(props: ComponentProps<typeof Heading>) {
		return (
			<Heading anchor {...props} className="heading-offset" level={level} />
		);
	};
};

const mdxComponents = {
	a: Link,
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
	Details: (props: ComponentProps<"details">) => (
		<details
			{...props}
			className="my-4 rounded-lg border-l-8 border-blue-500 bg-blue-50 p-4 details-content:h-0 details-content:overflow-clip details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-150 details-content:ease-out dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-100 [[open]]:details-content:h-auto"
		/>
	),
	Summary: (props: ComponentProps<"summary">) => (
		<summary {...props} className="cursor-pointer font-semibold select-none" />
	),
} as const;

const BlogPostMetadataSchema = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
	publishedAt: z.string().nullable(),
	summary: z.string(),
	image: z.string().optional(),
});

export type BlogPostMetadata = z.infer<typeof BlogPostMetadataSchema>;

export const evaluateBlogPostMDX = async ({
	content,
}: {
	content: string;
}): Promise<readonly [JSX.Element, BlogPostMetadata]> => {
	"use cache";
	cacheLife("hours");
	cacheTag("blog-posts");

	const { default: MDXContent, metadata } = await evaluate(content, {
		...jsxRuntime,
		format: "mdx",
		remarkPlugins: [remarkGfm],
	});

	const metadataResult = BlogPostMetadataSchema.safeParse(metadata);

	if (!metadataResult.success) {
		throw new Error("Invalid blog post metadata", {
			cause: {
				metadata,
				zodError: metadataResult.error,
			},
		});
	}

	return [
		MDXContent({
			components: mdxComponents,
		}),
		metadataResult.data,
	] as const;
};
