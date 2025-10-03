import type { ComponentProps } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends ComponentProps<"h1"> {
	level: HeadingLevel;
	anchor?: boolean;
}

export const Heading = ({
	children,
	level = 1,
	anchor,
	...props
}: HeadingProps) => {
	const HeadingTag = `h${level}` as const;

	let slug: string | undefined = undefined;
	if (anchor) {
		slug = slugify(children);
		children = (
			<a href={`#${slug}`} className="cursor-pointer no-underline">
				{children}
			</a>
		);
	}

	return (
		<HeadingTag id={slug} {...props}>
			{children}
		</HeadingTag>
	);
};

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
