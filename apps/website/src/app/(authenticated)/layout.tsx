import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { isAuthenticated, redirectToSignIn } = await auth();

	if (!isAuthenticated) {
		await redirectToSignIn({
			returnBackUrl: "/chat",
		});
	}

	return <ClerkProvider>{children}</ClerkProvider>;
}
