import type { ComponentProps } from "react";

export const Button = (props: ComponentProps<"button">) => {
	return (
		<button
			{...props}
			className={`${props.className} px-2 py-1 bg-blue-600 text-white rounded-md border ${props.disabled ? "cursor-not-allowed opacity-80 disabled" : ""}`}
		/>
	);
};
