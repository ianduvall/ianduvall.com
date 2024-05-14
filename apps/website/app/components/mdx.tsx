import React from "react";
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {}
function MDXLink(props: LinkProps) {
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

const Blockquote = (props: React.ComponentPropsWithoutRef<"blockquote">) => (
	<blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />
);

export const mdxComponents = {
	a: MDXLink,
	blockquote: Blockquote,
	code: Code,
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
} as const satisfies MDXRemoteProps["components"];
