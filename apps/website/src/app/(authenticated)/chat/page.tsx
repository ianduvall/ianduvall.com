import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Chat() {
	const { userId, isAuthenticated, redirectToSignIn } = await auth();

	if (!isAuthenticated) {
		await redirectToSignIn({
			returnBackUrl: "/chat",
		});
	}

	return (
		<div>
			<SignOutButton />
			<h1 className="my-6 text-3xl font-semibold">Chat</h1>
			<div>User id: {userId}</div>
		</div>
	);
}
