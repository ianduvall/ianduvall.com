import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Ian Duvall",
		template: "%s | Ian Duvall",
	},
	description: "My digital playground for ideas, projects, and thoughts.",
	openGraph: {
		title: "Ian Duvall's Site",
		description: "My digital playground for ideas, projects, and thoughts.",
		url: baseUrl,
		siteName: "Ian Duvall's Site",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${GeistSans.variable} ${GeistMono.variable} bg-white text-black dark:bg-black dark:text-white`}
		>
			<body className="mx-auto max-w-xl antialiased">
				<main className="flex min-h-svh min-w-0 flex-auto flex-col px-4 py-8">
					<Navbar />
					{children}
					<Footer />
					<Analytics />
					<SpeedInsights />
				</main>
			</body>
		</html>
	);
}
