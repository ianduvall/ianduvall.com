import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

export default function UnauthenticatedRootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="mx-auto flex min-h-svh min-w-0 max-w-xl flex-auto flex-col px-4 py-8">
			<Nav />
			{children}
			<Footer />
		</div>
	);
}
