import { useEffect, useRef, useState } from "react";

export interface QuotaInfo {
	inputQuota: number;
	inputUsage: number;
	inputQuotaLeft: number;
}

export function useLanguageModelSession(
	createOptions?: LanguageModelCreateOptions,
) {
	const sessionRef = useRef<LanguageModel | null>(null);
	const [downloading, setDownloading] = useState<boolean>(false);
	const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null);

	const updateQuotaInfo = () => {
		if (!sessionRef.current) return;

		const { inputQuota, inputUsage } = sessionRef.current;
		setQuotaInfo({
			inputQuota,
			inputUsage,
			inputQuotaLeft: inputQuota - inputUsage,
		});
	};

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
			updateQuotaInfo();
		}
		return sessionRef.current;
	};

	const resetSession = () => {
		sessionRef.current = null;
		setDownloading(false);
		setQuotaInfo(null);
	};

	useEffect(() => {
		return () => {
			sessionRef.current?.destroy();
		};
	}, []);

	return { getSession, resetSession, downloading, quotaInfo, updateQuotaInfo };
}
