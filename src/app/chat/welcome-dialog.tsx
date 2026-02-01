"use client";
import { useLayoutEffect, useRef } from "react";
import { Button } from "../components/button";

export function WelcomeDialog({
	onClose,
}: {
	onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useLayoutEffect(() => {
		dialogRef.current?.showModal();
	}, []);

	return (
		<dialog
			ref={dialogRef}
			className="top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl p-0 shadow-2xl backdrop:bg-black/70"
		>
			<div className="p-6">
				<h2 className="text-xl font-semibold">Welcome</h2>
				<div className="mt-4 space-y-3">
					<p>
						This chat is powered by your browser&apos;s built-in language model.
					</p>
					<p>
						Your conversations stay on your device — no data is sent to external
						servers.
					</p>
				</div>
				<Button
					type="button"
					onClick={(event) => {
						onClose?.(event);
						dialogRef.current?.close();
					}}
					className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2"
				>
					Get Started
				</Button>
			</div>
		</dialog>
	);
}
