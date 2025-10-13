import { ClerkProvider } from "@clerk/nextjs";

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider appearance={{ theme: "simple" }}>{children}</ClerkProvider>
	);
}
