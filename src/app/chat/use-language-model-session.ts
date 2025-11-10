import { useEffect, useRef, useState } from "react";

export function useLanguageModelSession(
	createOptions?: LanguageModelCreateOptions,
) {
	const sessionRef = useRef<LanguageModel | null>(null);
	const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

	const getSession = async (): Promise<LanguageModel> => {
		if (!sessionRef.current) {
			sessionRef.current = await LanguageModel.create({
				...createOptions,
				monitor(m) {
					createOptions?.monitor?.(m);

					m.addEventListener("downloadprogress", (progressEvent) => {
						setDownloadProgress(progressEvent.loaded);
					});
				},
			});
			// Clear download progress once model is loaded
			setDownloadProgress(null);
		}
		return sessionRef.current;
	};

	const resetSession = () => {
		sessionRef.current = null;
		setDownloadProgress(null);
	};

	useEffect(() => {
		return () => {
			sessionRef.current?.destroy();
		};
	}, []);

	return { getSession, resetSession, downloadProgress };
}
