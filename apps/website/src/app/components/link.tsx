import type { ComponentProps } from "react";
import RouterLink from "next/link";
import { cn } from "../shared";

export const Link = (props: ComponentProps<typeof RouterLink>) => {
	const className = cn(
		"text-gray-700 transition-all dark:text-gray-200 dark:decoration-blue-500 hover:text-gray-900 hover:dark:text-gray-50 underline decoration-blue-500 decoration-[0.1em] underline-offset-2 hover:underline-offset-[3px]",
		props.className,
	);
	const external = isExternalHref(props.href);
	const extraProps = external
		? { target: "_blank", rel: "noopener noreferrer" }
		: {};

	return <RouterLink {...props} {...extraProps} className={className} />;
};

const isExternalHref = (
	href: ComponentProps<typeof RouterLink>["href"],
): boolean => {
	if (typeof href === "string" && href) {
		if (href.startsWith("#") || href.startsWith("/")) {
			return false;
		}
		return /^(https?:)?\/\//i.test(href);
	}
	if (typeof href === "object") {
		const { protocol } = href;
		return typeof protocol === "string" && /https?:/.test(protocol);
	}

	return false;
};
