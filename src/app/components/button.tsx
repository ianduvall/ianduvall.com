import { useTransition, type ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
	action?: () => void | Promise<void>;
}

export const Button = ({
	action,
	children,
	className,
	disabled,
	onClick,
	...props
}: ButtonProps) => {
	const [isPending, startTransition] = useTransition();

	return (
		<button
			{...props}
			disabled={disabled}
			className={`${className} rounded-md border bg-blue-600 px-2 py-1 text-white transition-opacity ${disabled ? "cursor-not-allowed opacity-80" : ""}`}
			onClick={(event) => {
				onClick?.(event);
				if (!action || event.defaultPrevented) {
					return;
				}

				startTransition(async () => {
					await action();
				});
			}}
		>
			<span className="grid place-items-center *:[grid-area:1/1]">
				{isPending && <Spinner />}
				<span className={isPending ? "opacity-0" : ""}>{children}</span>
			</span>
		</button>
	);
};

function Spinner() {
	return (
		<span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
	);
}
