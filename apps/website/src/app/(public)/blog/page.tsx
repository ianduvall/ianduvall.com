import { BlogPosts } from "src/app/(public)/components/posts";
import { Suspense } from "react";
import type { Metadata } from "next";
import { Heading } from "src/app/components/heading";

export const metadata: Metadata = {
	title: "Blog",
	description: "Read my blog.",
};

export default function Page() {
	return (
		<section>
			<Heading
				className="heading-offset my-6 text-3xl font-semibold tracking-tighter"
				level={1}
			>
				Notes, thoughts, and more
			</Heading>
			<div className="my-4 space-y-3">
				<Suspense fallback={<p>Loading recent blog posts...</p>}>
					<BlogPosts recent={5} />
				</Suspense>
			</div>
		</section>
	);
}
