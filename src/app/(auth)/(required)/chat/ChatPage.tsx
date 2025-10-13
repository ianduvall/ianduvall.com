"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { cn } from "src/app/shared";

function MessageBubble({
	role,
	children,
}: {
	role: string;
	children: React.ReactNode;
}) {
	const isUser = role === "user";
	const isError = role === "error";
	return (
		<div
			className={cn(
				"group relative flex max-w-[85%] flex-col gap-1 rounded-2xl px-4 py-2 text-sm shadow-sm ring-1",
				isUser
					? "ml-auto bg-indigo-600 text-white ring-indigo-500/50"
					: isError
						? "bg-red-50 text-red-800 ring-red-200 dark:bg-red-950 dark:text-red-100 dark:ring-red-900"
						: "bg-white text-gray-800 ring-gray-200 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700",
			)}
		>
			{children}
		</div>
	);
}

function ScrollAnchor() {
	return <div data-anchor="bottom" />;
}

export function ChatPage() {
	const { messages, sendMessage, status, error } = useChat({
		transport: new DefaultChatTransport({ api: "/api/chat" }),
		experimental_throttle: 50,
	});
	const formRef = useRef<HTMLFormElement | null>(null);
	const listRef = useRef<HTMLDivElement | null>(null);
	const isAutoScrollRef = useRef(true);

	// Scroll to bottom when messages change if auto-scroll is enabled
	useEffect(() => {
		if (!isAutoScrollRef.current) return;
		const el = listRef.current;
		if (!el) return;
		el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		function onScroll() {
			const element = listRef.current;
			if (!element) return;
			const nearBottom =
				element.scrollHeight - element.scrollTop - element.clientHeight < 48;
			isAutoScrollRef.current = nearBottom;
		}
		el.addEventListener("scroll", onScroll, { passive: true });
		return () => el.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="flex h-[100dvh] w-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
			<header className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
				<div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
				<h1 className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
					Chat
				</h1>
				<div className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
					{status === "streaming"
						? "Generating response..."
						: status === "submitted"
							? "Sending message..."
							: ""}
				</div>
			</header>
			<div
				ref={listRef}
				className="dark:scrollbar-track-zinc-950 flex-1 space-y-4 overflow-y-auto px-4 py-4 [scrollbar-width:thin]"
			>
				{messages.length === 0 && (
					<div className="mx-auto mt-14 max-w-sm text-center text-sm text-zinc-500 dark:text-zinc-400">
						Start the conversation by asking a question.
					</div>
				)}
				{messages.map((m) => {
					const textParts = m.parts
						.filter((p) => p.type === "text")
						.map((p) => p.text)
						.join("");
					return (
						<div key={m.id} className="flex w-full flex-col">
							<MessageBubble role={m.role}>{textParts}</MessageBubble>
						</div>
					);
				})}
				<ScrollAnchor />
			</div>
			<form
				ref={formRef}
				className="border-t border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
				action={async (formData) => {
					const text = (formData.get("message") as string | null)?.trim() || "";
					if (!text) return;
					sendMessage({ text });
					formRef.current?.reset();
				}}
			>
				<fieldset
					disabled={status === "submitted" || status === "streaming"}
					className="overflow-none flex items-end gap-2"
				>
					<div className="relative flex-1">
						<textarea
							name="message"
							rows={1}
							placeholder="Ask me anything…"
							onInput={(e) => {
								const target = e.currentTarget;
								target.style.height = "auto";
								target.style.height = `${Math.min(target.scrollHeight, 200)}px`;
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									formRef.current?.requestSubmit();
								}
							}}
							className="w-full resize-none overflow-y-hidden rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-12 text-sm shadow-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30"
							autoComplete="off"
						/>
					</div>
					<button
						type="submit"
						className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-400"
					>
						{status === "submitted" || status === "streaming"
							? "Sending…"
							: "Send"}
					</button>
				</fieldset>
				{error && (
					<p className="mt-2 text-xs text-red-600 dark:text-red-400">
						{String(error)}
					</p>
				)}
			</form>
		</div>
	);
}
