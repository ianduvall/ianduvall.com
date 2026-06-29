import { languageModelCreateOptions } from "./lm-config";

interface CreateLanguageModelSessionOptions {
	onDownloadProgress?: (event: ProgressEvent) => void;
}

export function promptApiIsAvailable() {
	return typeof LanguageModel !== "undefined";
}

export async function getLanguageModelAvailability(): Promise<Availability> {
	if (!promptApiIsAvailable()) {
		return "unavailable";
	}

	return LanguageModel.availability(languageModelCreateOptions);
}

export async function createLanguageModelSession({
	onDownloadProgress,
}: CreateLanguageModelSessionOptions = {}) {
	if (!promptApiIsAvailable()) {
		throw new Error("Chrome's built-in AI Prompt API is unavailable.");
	}

	return LanguageModel.create({
		...languageModelCreateOptions,
		monitor(monitor) {
			if (onDownloadProgress) {
				monitor.ondownloadprogress = onDownloadProgress;
			}
		},
	});
}
