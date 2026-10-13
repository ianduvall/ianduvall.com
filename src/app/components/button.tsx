import type { ComponentProps } from "react";

export const Button = ({ className, disabled, ...props }: ComponentProps<"button">) => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={`${className} rounded-md border bg-blue-600 px-2 py-1 text-white transition-opacity ${disabled ? "cursor-not-allowed opacity-80" : ""}`}
		/>
	);
};
