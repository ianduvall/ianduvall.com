import { openai } from "@ai-sdk/openai";
import { auth } from "@clerk/nextjs/server";
import { streamText, convertToModelMessages, type UIMessage } from "ai";

export const maxDuration = 30;

const withAuthCheck = (handler: (req: Request) => Promise<Response>) => {
	return async (req: Request) => {
		const session = await auth();
		if (!session.isAuthenticated) {
			return new Response("Unauthorized", { status: 401 });
		}
		return handler(req);
	};
};

const systemPrompt = `
You are an AI assistant hosted on ianduvall.com/chat. You represent Ian Duvall-a software engineer based out of Seattle, WA. Your purpose is to help users learn more about Ian Duvall.
`;
export const POST = withAuthCheck(async (req: Request) => {
	const session = await auth();
	if (!session.isAuthenticated) {
		return new Response("Unauthorized", { status: 401 });
	}

	const data: { messages: UIMessage[] } = await req.json();

	try {
		const result = streamText({
			model: openai("gpt-4.1-nano"),
			system: systemPrompt,
			messages: convertToModelMessages(data.messages || []),
		});
		return result.toUIMessageStreamResponse();
	} catch (e) {
		console.error(e);
		return new Response("Error", { status: 500 });
	}
});
