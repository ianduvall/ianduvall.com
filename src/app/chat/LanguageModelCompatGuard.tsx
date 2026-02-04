"use client";
import { startTransition, Suspense, use, useRef, useState } from "react";
import { Link } from "../components/link";
import { languageModelCreateOptions } from "./lm-config";
import { Button } from "../components/button";

interface RenderProps {
	session: LanguageModel;
	downloaded: boolean;
}
interface LanguageModelCompatGuardProps {
	children: (renderProps: RenderProps) => React.ReactNode;
}

const availabilityPromise = LanguageModel.availability(
	languageModelCreateOptions,
);

export function LanguageModelCompatGuard({
	children,
}: LanguageModelCompatGuardProps) {
	const [session, setSession] = useState<LanguageModel | null>(null);
	const [downloaded, setDownloaded] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	if (session) {
		return children({ session, downloaded });
	}

	return (
		<dialog
			ref={dialogRef}
			className="top-1/2 left-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 shadow-2xl backdrop:bg-black/70"
			closedby="none"
			open
		>
			<div className="max-w-md space-y-4 p-6">
				<Message
					action={async () => {
						const lmSession = await LanguageModel.create({
							...languageModelCreateOptions,
							monitor(monitor) {
								monitor.ondownloadprogress = (event) => {
									startTransition(() => {
										setDownloaded(event.loaded >= 1);
									});
								};
							},
						});

						startTransition(() => {
							setSession(lmSession);
						});
					}}
					availabilityPromise={availabilityPromise}
				/>
			</div>
		</dialog>
	);
}

const Message = ({
	availabilityPromise,
	action,
}: {
	availabilityPromise: Promise<Availability>;
	action?: () => void;
}) => {
	const availability = use(availabilityPromise);

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
};
