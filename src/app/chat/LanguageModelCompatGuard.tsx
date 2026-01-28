"use client";
import { use, useState, type PropsWithChildren } from "react";
import { Link } from "../components/link";

interface LanguageModelCompatGuardProps extends PropsWithChildren {
	createOptions: LanguageModelCreateCoreOptions;
}

export function LanguageModelCompatGuard({
	children,
	createOptions,
}: LanguageModelCompatGuardProps) {
	const [availabilityPromise] = useState(() =>
		LanguageModel.availability(createOptions),
	);
	const availability = use(availabilityPromise);

	if (availability === "unavailable") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<div className="max-w-md space-y-4 text-center">
					<h1 className="text-2xl font-bold">Chat Unavailable</h1>
					<p className="text-gray-600">
						Chrome&apos;s built-in AI is not available on this device.
						<br />
						You&apos;ll need to enable the Prompt API flag in Chrome via{" "}
						<Link
							href="chrome://flags/#prompt-api-for-gemini-nano"
							target="_blank"
							rel="noopener noreferrer"
							onClick={(event) => {
								event.preventDefault();
								navigator.clipboard.writeText(
									"chrome://flags/#prompt-api-for-gemini-nano",
								);
								alert("Link copied to clipboard. Paste it into a new tab.");
							}}
						>
							chrome://flags/#prompt-api-for-gemini-nano
						</Link>
						.
					</p>
				</div>
			</main>
		);
	}

	return <>{children}</>;
}
