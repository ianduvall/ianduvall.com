import { Nav } from "./components/nav";
import { Footer } from "./components/footer";

export default function UnauthenticatedRootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="mx-auto flex min-h-svh max-w-xl min-w-0 flex-auto flex-col px-4 py-8 [content-visibility:auto] [contain-intrinsic-size:1px_1200px]">
			<Nav />
			{children}
			<Footer />
		</div>
	);
}
