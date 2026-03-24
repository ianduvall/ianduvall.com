import { isValidElement, type ComponentProps, type ReactNode } from "react";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends ComponentProps<"h1"> {
	level: HeadingLevel;
	anchor?: boolean;
}

export const Heading = ({ children, level = 1, anchor, ...props }: HeadingProps) => {
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

const normalizeText = (input: ReactNode): string => {
	if (input === null || input === undefined || input === false || input === true) return "";
	if (typeof input === "string" || typeof input === "number" || typeof input === "bigint") {
		return String(input);
	}
	if (Array.isArray(input)) {
		return input.map(normalizeText).join("");
	}
	if (isValidElement<{ children?: ReactNode }>(input)) {
		return normalizeText(input.props.children);
	}
	return "";
};

const slugify = (input: ReactNode): string => {
	const text = normalizeText(input).trim();
	if (!text) return "";
	return text
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
		.replace(/--+/g, "-"); // Replace multiple - with single -
};
