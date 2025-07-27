import { ClerkProvider } from "@clerk/nextjs";

export default function AuthenticatedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <ClerkProvider>{children}</ClerkProvider>;
}
