"use client";
import { useEffect, useState, type PropsWithChildren } from "react";

interface LanguageModelCompatGuardProps extends PropsWithChildren {
	createOptions: LanguageModelCreateCoreOptions;
}

const languageModelUndefined = typeof LanguageModel === "undefined";

export function LanguageModelCompatGuard({
	children,
	createOptions,
}: LanguageModelCompatGuardProps) {
	const [availability, setAvailability] = useState<Availability | "tbd">(
		languageModelUndefined ? "unavailable" : "tbd",
	);

	useEffect(() => {
		if (languageModelUndefined) {
			return;
		}

		(async function checkAvailability() {
			const available = await LanguageModel.availability(createOptions);
			setAvailability(available);
		})();
	}, [createOptions]);

	if (availability === "tbd") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<div className="text-lg">Checking availability...</div>
			</main>
		);
	}

	if (availability === "unavailable") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<div className="max-w-md space-y-4 text-center">
					<h1 className="text-2xl font-bold">Chat Unavailable</h1>
					<p className="text-gray-600">
						Chrome&apos;s built-in AI is not available on this device.
					</p>
					<p className="text-sm text-gray-500">
						Make sure you&apos;re using Chrome Canary (version 128+) with the
						Prompt API enabled via chrome://flags/#prompt-api-for-gemini-nano
					</p>
				</div>
			</main>
		);
	}

	return <>{children}</>;
}
