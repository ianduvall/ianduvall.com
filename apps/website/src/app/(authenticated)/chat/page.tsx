import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
	const { userId } = await auth();

	return (
		<div>
			<SignOutButton />
			<h1 className="my-6 text-3xl font-semibold">Chat</h1>
			<div>User id: {userId}</div>
		</div>
	);
}
