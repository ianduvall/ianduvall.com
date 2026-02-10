"use client";
import dynamic from "next/dynamic";
import { startTransition, Suspense, useRef, useState } from "react";
import { languageModelCreateOptions } from "./lm-config";

function AvailabilityFallback() {
	return <div className="min-h-40 p-6">Checking availability...</div>;
}

const AvailabilityMessage = dynamic(() => import("./availability-message"), {
	loading: AvailabilityFallback,
	ssr: false,
});

interface LanguageModelCompatProps {
	children: (renderProps: {
		session: LanguageModel;
		downloaded: boolean;
	}) => React.ReactNode;
}

export function LanguageModelCompat({ children }: LanguageModelCompatProps) {
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
				<Suspense fallback={<AvailabilityFallback />}>
					<AvailabilityMessage
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
					/>
				</Suspense>
			</div>
		</dialog>
	);
}
