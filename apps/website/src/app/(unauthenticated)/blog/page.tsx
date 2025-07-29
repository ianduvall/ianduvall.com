import { BlogPosts } from "src/app/(unauthenticated)/components/posts";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Read my blog.",
};

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				Notes, thoughts, and more
			</h1>
			<Suspense fallback={<p>Loading recent blog posts...</p>}>
				<BlogPosts recent={5} />
			</Suspense>
		</section>
	);
}
