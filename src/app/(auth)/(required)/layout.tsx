import { auth } from "@clerk/nextjs/server";

export default async function AuthRequiredLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (!session.isAuthenticated) {
		await session.redirectToSignIn();
	}

	return <>{children}</>;
}
