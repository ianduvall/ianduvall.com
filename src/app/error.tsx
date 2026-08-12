"use client";

export default function Error({
	error,
	retry,
}: {
	error: Error & { digest?: string };
	retry: () => void;
}) {
	return (
		<main className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
			<h2 className="text-2xl font-semibold">Something went wrong</h2>
			{error.digest ? <p className="text-sm opacity-70">Error ID: {error.digest}</p> : null}
			<button
				type="button"
				onClick={() => retry()}
				className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				Try again
			</button>
		</main>
	);
}
