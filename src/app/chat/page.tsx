"use client";
import { startTransition, Suspense, useEffect, useRef, useState } from "react";
import { languageModelCreateOptions } from "./lm-config";
import { Button } from "../components/button";
import { ChatMarkdown } from "./chat-markdown";
import { LanguageModelCompat } from "./language-model-compat";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

function createMessage(role: Message["role"], content: string): Message {
	return {
		id: crypto.randomUUID(),
		role,
		content,
	};
}

export default function ChatPage() {
	return (
		<main className="flex h-screen min-h-screen flex-col">
			<LanguageModelCompat>
				{({ session, downloaded }) => (
					<ChatUI initialSession={session} downloaded={downloaded} />
				)}
			</LanguageModelCompat>
		</main>
	);
}

function ChatUI({
	initialSession,
	downloaded,
}: {
	initialSession: LanguageModel;
	downloaded: boolean;
}) {
	const [session, setSession] = useState<LanguageModel | null>(initialSession);
	const [messages, setMessages] = useState<ReadonlyArray<Message>>([]);
	const [streamingMessage, setStreamingMessage] = useState<string>("");
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const abortControllerRef = useRef<AbortController | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, streamingMessage]);

	const header = (
		<header className="border-b px-4 py-4">
			<div className="mx-auto flex max-w-4xl items-center justify-between">
				<h1 className="text-xl font-semibold">Chat</h1>
				{session && (
					<span className="text-sm text-gray-400">
						{(session.inputQuota - session.inputUsage).toLocaleString()} tokens
						left
					</span>
				)}
				<Button
					type="button"
					action={async () => {
						inputRef.current?.focus();
						setMessages([]);
						setStreamingMessage("");
						const newSession = await LanguageModel.create({
							...languageModelCreateOptions,
						});
						startTransition(() => {
							setSession(newSession);
						});
					}}
				>
					New Chat
				</Button>
			</div>
		</header>
	);

	const body = (
		<div className="flex-1 overflow-y-auto px-4 py-6">
			<div className="mx-auto max-w-4xl space-y-6">
				{messages.length === 0 && !streamingMessage ? (
					<div className="flex h-full items-center justify-center text-gray-400">
						<p>Start a conversation...</p>
					</div>
				) : (
					<>
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
							>
								<div
									className={`max-w-[80%] rounded-lg px-4 py-2 ${
										message.role === "user"
											? "bg-blue-600 text-white"
											: "bg-gray-100 text-gray-900"
									}`}
								>
									<ChatMarkdown>{message.content}</ChatMarkdown>
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
									<ChatMarkdown isStreaming>{streamingMessage}</ChatMarkdown>
								</div>
							</div>
						)}
					</>
				)}
				<div ref={messagesEndRef} />
			</div>
		</div>
	);

	const footer = (
		<div className="relative border-t px-4 py-4">
			{downloaded ? null : <DownloadingIndicator />}
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					if (!session || !input.trim() || isLoading) return;

					const userMessage = input.trim();
					setInput("");
					setMessages((prev) => [...prev, createMessage("user", userMessage)]);
					setIsLoading(true);
					const abortController = new AbortController();
					abortControllerRef.current = abortController;

					try {
						const stream = session.promptStreaming(userMessage, {
							signal: abortController.signal,
						});

						let messageBuffer = "";
						let newlineBuffer = "";
						setStreamingMessage("");

						for await (const chunk of stream) {
							const isOnlyNewlines = /^[\r\n]+$/.test(chunk);

							if (isOnlyNewlines) {
								newlineBuffer += chunk;
							} else {
								if (newlineBuffer) {
									messageBuffer += newlineBuffer;
									newlineBuffer = "";
								}
								messageBuffer += chunk;
							}

							setStreamingMessage(messageBuffer);
						}

						setMessages((prev) => [
							...prev,
							createMessage("assistant", messageBuffer),
						]);
						setStreamingMessage("");
					} catch (error) {
						if (Error.isError(error) && error.name === "AbortError") {
							return;
						}
						console.error("Chat error:", error);
						setMessages((prev) => [
							...prev,
							createMessage(
								"assistant",
								"Sorry, an error occurred. Please try again later.",
							),
						]);
						setStreamingMessage("");
					} finally {
						setIsLoading(false);
						abortControllerRef.current = null;
					}
				}}
				className="mx-auto max-w-4xl"
			>
				<div className="flex gap-2">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.currentTarget.value)}
						placeholder="Type your message..."
						autoFocus={true}
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
	);

	return (
		<>
			{header}
			{body}
			{footer}
		</>
	);
}

function DownloadingIndicator() {
	return (
		<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
			<div className="rounded-full bg-gray-900/95 px-5 py-2.5 shadow-xl backdrop-blur-sm">
				<div className="flex items-center gap-3">
					<div className="flex gap-1">
						<span className="h-1.5 w-1.5 animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-blue-400" />
						<span className="h-1.5 w-1.5 animate-[pulse_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-blue-400" />
						<span className="h-1.5 w-1.5 animate-[pulse_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-blue-400" />
					</div>
					<span className="text-sm tracking-wide text-white/90">
						Downloading model
					</span>
				</div>
			</div>
		</div>
	);
}
