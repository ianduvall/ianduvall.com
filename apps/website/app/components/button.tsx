import type { ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => {
	return (
		<button
			{...props}
			className={`${props.className} rounded-md border bg-blue-600 py-1 px-2 text-white ${props.disabled ? "disabled cursor-not-allowed opacity-80" : ""}`}
		/>
	);
};
