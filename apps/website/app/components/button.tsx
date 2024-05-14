import type { ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => {
	return (
		<button
			{...props}
			className={`${props.className} rounded-md border bg-blue-600 px-2 py-1 text-white ${props.disabled ? "disabled cursor-not-allowed opacity-80" : ""}`}
		/>
	);
};
