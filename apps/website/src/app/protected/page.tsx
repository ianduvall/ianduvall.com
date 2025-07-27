import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
	const { userId } = await auth();

	return (
		<div>
			<h1 className="my-6 text-3xl font-semibold">Protected Content</h1>

			<SignedOut>
				<div className="rounded-lg border p-6 text-center">
					<h2 className="mb-4 text-xl font-semibold">
						Authentication Required
					</h2>
					<p className="mb-4 text-gray-600">
						You need to sign in to view this protected content.
					</p>
					<SignInButton>
						<button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
							Sign In to Continue
						</button>
					</SignInButton>
				</div>
			</SignedOut>

			<SignedIn>
				<div className="rounded-lg border border-green-200 bg-green-50 p-6">
					<h2 className="mb-4 text-xl font-semibold text-green-800">
						🎉 Welcome! You are authenticated
					</h2>
					<p className="mb-2 text-green-700">
						Your user ID is:{" "}
						<code className="rounded bg-green-100 px-2 py-1">{userId}</code>
					</p>
					<p className="text-green-700">
						This content is only visible to authenticated users.
					</p>
				</div>

				<div className="mt-6">
					<h3 className="mb-3 text-lg font-semibold">Protected Features:</h3>
					<ul className="list-disc space-y-2 pl-5">
						<li>Access to premium content</li>
						<li>Personalized user dashboard</li>
						<li>Exclusive community features</li>
						<li>User profile management</li>
					</ul>
				</div>
			</SignedIn>
		</div>
	);
}
