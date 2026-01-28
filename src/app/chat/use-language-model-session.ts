import { useEffect, useRef, useState } from "react";

export function useLanguageModelSession(
	createOptions?: LanguageModelCreateOptions,
) {
	const sessionRef = useRef<LanguageModel | null>(null);
	const [downloading, setDownloading] = useState<boolean>(false);

	const getSession = async (): Promise<LanguageModel> => {
		if (!sessionRef.current) {
			sessionRef.current = await LanguageModel.create({
				...createOptions,
				monitor(createMonitor) {
					createOptions?.monitor?.(createMonitor);

					createMonitor.addEventListener("downloadprogress", () => {
						setDownloading(true);
					});
				},
			});
			// Clear download progress once model is loaded
			setDownloading(false);
		}
		return sessionRef.current;
	};

	const resetSession = () => {
		sessionRef.current = null;
		setDownloading(false);
	};

	useEffect(() => {
		return () => {
			sessionRef.current?.destroy();
		};
	}, []);

	return { getSession, resetSession, downloading };
}
