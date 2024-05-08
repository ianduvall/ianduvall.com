"use client";
import { useRef, useState } from "react";
import { Button } from "./Button";
import { resourcesCache } from "./resource";

const GlobalCache = () => {
	return JSON.stringify(
		Object.fromEntries(
			Array.from(resourcesCache.entries()).map(([key, resource]) => [
				key,
				Array.from(
					// @ts-expect-error - internal property
					resource._cache.keys(),
				),
			]),
		),
		null,
		2,
	);
};

export const DebugModal = () => {
	const debugModalId = "DebugDialog";
	const modalRef = useRef<HTMLDialogElement>(null);
	const [, setState] = useState({});
	const rerender = () => setState({});

	return (
		<>
			<Button
				onClick={() => {
					rerender();
					modalRef.current?.showModal();
				}}
			>
				Debug
			</Button>

			<dialog
				ref={modalRef}
				id={debugModalId}
				className="max-w-screen w-screen bottom-0"
			>
				<details className="overflow-y-auto max-h-60">
					<summary>
						<h3>Caches</h3>
					</summary>

					<pre>
						<GlobalCache />
					</pre>
				</details>

				<form>
					<Button
						onClick={(e) => {
							e.preventDefault();
							resourcesCache.forEach((resource) => {
								resource.invalidateAll();
							});

							rerender();
						}}
					>
						Invalidate caches
					</Button>
				</form>

				<footer>
					<form method="dialog">
						<Button autoFocus>Close</Button>
					</form>
				</footer>
			</dialog>
		</>
	);
};
