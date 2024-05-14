import { BlogPosts } from "app/components/posts";
import { Suspense } from "react";

export const metadata = {
	title: "Blog",
	description: "Read my blog.",
};

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				Notes, thoughts, and ...
			</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<BlogPosts recent={5} />
			</Suspense>
		</section>
	);
}
