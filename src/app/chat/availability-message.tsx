"use client";
import { use } from "react";
import { Link } from "../components/link";
import { Button } from "../components/button";
import { languageModelCreateOptions } from "./lm-config";

const availabilityPromise =
	typeof LanguageModel !== "undefined" &&
	LanguageModel.availability(languageModelCreateOptions);

export default function Message({ action }: { action?: () => void }) {
	const availability = availabilityPromise
		? use(availabilityPromise)
		: "unavailable";

	if (availability === "unavailable") {
		return (
			<>
				<h2 className="text-2xl font-bold">Chat Unavailable</h2>
				<div>
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
				</div>
			</>
		);
	}

	return (
		<>
			<h2 className="text-2xl font-bold">Welcome</h2>
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
				action={action}
				className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2"
			>
				Get Started
			</Button>
		</>
	);
}
