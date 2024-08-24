import React, { type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";

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
	const Heading = ({ children }: ComponentPropsWithoutRef<"h1">) => {
		const slug = slugify(children);
		const HeadingTag = `h${level}` satisfies keyof JSX.IntrinsicElements;
		return (
			<HeadingTag id={slug}>
				<a href={`#${slug}`} className="anchor" key={`link-${slug}`}>
					{children}
				</a>
			</HeadingTag>
		);
	};

	return Heading;
};

export const mdxComponents = {
	a: function MDXLink(props) {
		let href = props.href;

		if (href?.startsWith("/")) {
			return <Link href={href} {...props} />;
		}

		if (href?.startsWith("#")) {
			return <a {...props} />;
		}

		return <a target="_blank" rel="noopener noreferrer" {...props} />;
	},
	blockquote: (props) => (
		<blockquote className="my-4 border-l-4 border-gray-300 pl-4" {...props} />
	),
	code: function Code({ children, ...props }) {
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
			<Image className={`rounded-lg ${props.className ?? ""}`} {...props} />
		);
	},
} as const satisfies MDXRemoteProps["components"];
