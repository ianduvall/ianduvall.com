import type { ComponentProps } from "react";
import RouterLink from "next/link";
import { cn } from "../shared";

export const Link = (
	props: ComponentProps<"a"> & ComponentProps<typeof RouterLink>,
) => {
	const href = props.href;
	const className = cn(
		"text-gray-700 transition-all dark:text-gray-200 dark:decoration-blue-500 hover:text-gray-900 hover:dark:text-gray-50 underline decoration-blue-500 decoration-[0.1em] underline-offset-2 hover:underline-offset-[3px]",
		props.className,
	);

	if (href?.startsWith("/")) {
		return <RouterLink {...props} href={href} className={className} />;
	}

	if (href?.startsWith("#")) {
		return <a {...props} className={className} />;
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			{...props}
			className={className}
		/>
	);
};
