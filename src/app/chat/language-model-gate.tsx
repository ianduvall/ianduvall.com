"use client";

import { startTransition, useEffect, useState } from "react";
import { Button } from "../components/button";
import { createLanguageModelSession, getLanguageModelAvailability } from "./language-model";

type LanguageModelGateState =
	| { status: "checking" }
	| { status: "ready" }
	| { status: "creating"; isModelDownloading: boolean }
	| { status: "unavailable" }
	| { status: "error"; message: string };

interface LanguageModelGateProps {
	children: (renderProps: { session: LanguageModel }) => React.ReactNode;
}

export function LanguageModelGate({ children }: LanguageModelGateProps) {
	const [gateState, setGateState] = useState<LanguageModelGateState>({ status: "checking" });
	const [session, setSession] = useState<LanguageModel | null>(null);

	useEffect(() => {
		let isMounted = true;

		async function updateAvailability() {
			try {
				const availability = await getLanguageModelAvailability();

				if (!isMounted) {
					return;
				}

				startTransition(() => {
					setGateState(
						availability === "unavailable" ? { status: "unavailable" } : { status: "ready" },
					);
				});
			} catch (error) {
				console.error("Language model availability check failed:", error);

				if (!isMounted) {
					return;
				}

				startTransition(() => {
					setGateState({
						status: "error",
						message: "Chrome's built-in AI could not be checked. Please try again.",
					});
				});
			}
		}

		void updateAvailability();

		return () => {
			isMounted = false;
		};
	}, []);

	if (session) {
		return children({ session });
	}

	async function startSession() {
		startTransition(() => {
			setGateState({ status: "creating", isModelDownloading: false });
		});

		try {
			const newSession = await createLanguageModelSession({
				onDownloadProgress(event) {
					startTransition(() => {
						setGateState({ status: "creating", isModelDownloading: event.loaded < 1 });
					});
				},
			});

			startTransition(() => {
				setSession(newSession);
				setGateState({ status: "ready" });
			});
		} catch (error) {
			console.error("Language model session creation failed:", error);
			startTransition(() => {
				setGateState({
					status: "error",
					message: "Chrome's built-in AI could not start. Please try again.",
				});
			});
		}
	}

	return (
		<dialog
			className="top-1/2 left-1/2 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl p-5 shadow-2xl backdrop:bg-black/70"
			closedby="none"
			open
		>
			<div className="max-w-md space-y-4 p-6">
				<LanguageModelGateContent gateState={gateState} startSession={startSession} />
			</div>
		</dialog>
	);
}

function LanguageModelGateContent({
	gateState,
	startSession,
}: {
	gateState: LanguageModelGateState;
	startSession: () => Promise<void>;
}) {
	if (gateState.status === "checking") {
		return (
			<>
				<h2 className="text-2xl font-bold">Checking Availability</h2>
				<p>Checking Chrome&apos;s built-in AI support...</p>
			</>
		);
	}

	if (gateState.status === "unavailable") {
		return (
			<>
				<h2 className="text-2xl font-bold">Chat Unavailable</h2>
				<p>Chrome&apos;s built-in AI is available in Chrome 148+ on supported devices.</p>
			</>
		);
	}

	if (gateState.status === "error") {
		return (
			<>
				<h2 className="text-2xl font-bold">Chat Unavailable</h2>
				<p>{gateState.message}</p>
				<Button
					type="button"
					action={startSession}
					className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2"
				>
					Try Again
				</Button>
			</>
		);
	}

	const preparingMessage =
		gateState.status === "creating"
			? gateState.isModelDownloading
				? "Downloading model..."
				: "Preparing model..."
			: null;

	return (
		<>
			<h2 className="text-2xl font-bold">Welcome</h2>
			<div className="mt-4 space-y-3">
				<p>This chat is powered by your browser&apos;s built-in language model.</p>
				<p>Your conversations stay on your device. No data is sent to external servers.</p>
				{preparingMessage && <p>{preparingMessage}</p>}
			</div>
			<Button
				type="button"
				action={startSession}
				disabled={gateState.status === "creating"}
				className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2"
			>
				Get Started
			</Button>
		</>
	);
}
