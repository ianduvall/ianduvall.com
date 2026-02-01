export const languageModelCreateOptions = {
	expectedInputs: [{ type: "text", languages: ["en"] }],
	expectedOutputs: [{ type: "text", languages: ["en"] }],
	initialPrompts: [
		{
			role: "system",
			content: `You are a helpful assistant. Be concise and clear. Today is ${new Date().toISOString().split("T")[0]}.`,
		},
	],
} as const satisfies LanguageModelCreateOptions;
