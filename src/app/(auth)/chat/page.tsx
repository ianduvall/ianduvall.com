"use client";
import { useEffect, useRef, useState } from "react";

// patch ReadableStream to support for-await-of
declare global {
	interface ReadableStream<R = any, T = any> {
		[Symbol.asyncIterator](): AsyncIterableIterator<T>;
	}
}

const languageModelCreateOptions = {
	expectedInputs: [{ type: "text", languages: ["en"] }],
	expectedOutputs: [{ type: "text", languages: ["en"] }],
} as const satisfies LanguageModelCreateCoreOptions;

interface Message {
	role: "user" | "assistant";
	content: string;
}

export default function ChatPage() {
	const [availability, setAvailability] = useState<Availability | "tbd">("tbd");
	const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);
	const [streamingMessage, setStreamingMessage] = useState<string>("");
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const sessionRef = useRef<LanguageModel | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		(async function checkAvailability() {
			const availability = await LanguageModel.availability(
				languageModelCreateOptions,
			);
			setAvailability(availability);
		})();
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, streamingMessage]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading || availability !== "available") return;

		const userMessage = input.trim();
		setInput("");
		setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
		setIsLoading(true);

		try {
			// Create or reuse session
			if (!sessionRef.current) {
				sessionRef.current = await LanguageModel.create(
					languageModelCreateOptions,
				);
			}

			const stream = sessionRef.current.promptStreaming(userMessage);

			// Initialize streaming message
			setStreamingMessage("");
			const chunks: string[] = [];

			// Read from the stream
			for await (const chunk of stream) {
				chunks.push(chunk);
				setStreamingMessage((prev) => prev + chunk);
			}

			// Add the completed message to the messages array
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: chunks.join("") },
			]);
			setStreamingMessage("");
		} catch (error) {
			console.error("Chat error:", error);
			setMessages((prev) => [
				...prev,
				{
					role: "assistant",
					content: "Sorry, an error occurred. Please try again.",
				},
			]);
			setStreamingMessage("");
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = () => {
		setMessages([]);
		setStreamingMessage("");
		sessionRef.current = null;
	};

	if (availability === "tbd") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<div className="text-lg">Checking availability...</div>
			</main>
		);
	}

	if (availability !== "available") {
		return (
			<main className="flex min-h-screen items-center justify-center">
				<div className="max-w-md space-y-4 text-center">
					<h1 className="text-2xl font-bold">Chat Unavailable</h1>
					<p className="text-gray-600">
						Chrome&apos;s built-in AI is not available. Status: {availability}
					</p>
					<p className="text-sm text-gray-500">
						Make sure you&apos;re using Chrome Canary with the Prompt API
						enabled.
					</p>
				</div>
			</main>
		);
	}

	return (
		<main className="flex h-screen flex-col">
			{/* Header */}
			<header className="border-b px-4 py-4">
				<div className="mx-auto flex max-w-4xl items-center justify-between">
					<h1 className="text-xl font-semibold">Chat</h1>
					{messages.length > 0 && (
						<button
							type="button"
							onClick={handleReset}
							className="rounded-md px-3 py-1 text-sm hover:bg-gray-100"
						>
							New Chat
						</button>
					)}
				</div>
			</header>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto px-4 py-6">
				<div className="mx-auto max-w-4xl space-y-6">
					{messages.length === 0 && !streamingMessage ? (
						<div className="flex h-full items-center justify-center text-gray-500">
							<p>Start a conversation...</p>
						</div>
					) : (
						<>
							{messages.map((message, index) => (
								<div
									key={index}
									className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
								>
									<div
										className={`max-w-[80%] rounded-lg px-4 py-2 ${
											message.role === "user"
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-900"
										}`}
									>
										<div className="wrap-break-word whitespace-pre-wrap">
											{message.content}
										</div>
									</div>
								</div>
							))}
							{isLoading && !streamingMessage && (
								<div className="flex justify-start">
									<div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 text-gray-900">
										<div className="flex items-center gap-2">
											<div className="flex gap-1">
												<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
												<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
												<div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
											</div>
										</div>
									</div>
								</div>
							)}
							{streamingMessage && (
								<div className="flex justify-start">
									<div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 text-gray-900">
										<div className="wrap-break-word whitespace-pre-wrap">
											{streamingMessage}
										</div>
									</div>
								</div>
							)}
						</>
					)}
					<div ref={messagesEndRef} />
				</div>
			</div>

			{/* Input */}
			<div className="border-t px-4 py-4">
				<form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
					<div className="flex gap-2">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.currentTarget.value)}
							placeholder="Type your message..."
							disabled={isLoading}
							className="flex-1 rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none disabled:bg-gray-100"
						/>
						<button
							type="submit"
							disabled={isLoading || !input.trim()}
							className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{isLoading ? "Sending..." : "Send"}
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
