"use client";

import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";

const plugins = { code };

export function ChatMarkdown({
	children,
	isStreaming,
}: {
	children: string;
	isStreaming?: boolean;
}) {
	return (
		<Streamdown animated plugins={plugins} isAnimating={isStreaming}>
			{children}
		</Streamdown>
	);
}
