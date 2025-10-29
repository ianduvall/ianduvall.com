import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={null}>
			<ClerkProvider appearance={{ theme: "simple" }}>{children}</ClerkProvider>
		</Suspense>
	);
}
