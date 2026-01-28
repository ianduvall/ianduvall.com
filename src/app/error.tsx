"use client";

export default function Error({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
			<h2 className="text-2xl font-semibold">Something went wrong</h2>
			<button
				type="button"
				onClick={reset}
				className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Try again
			</button>
		</main>
	);
}
