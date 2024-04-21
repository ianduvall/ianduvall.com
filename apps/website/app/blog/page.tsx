import { BlogPosts } from "app/components/posts";
import { Suspense } from "react";

export const metadata = {
	title: "Blog",
	description: "Read my blog.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<BlogPosts />
			</Suspense>
		</section>
	);
}
