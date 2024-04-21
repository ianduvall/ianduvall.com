import { BlogPosts } from "app/components/posts";
import { Suspense } from "react";

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				My Portfolio
			</h1>
			<p className="mb-4">
				This is my portfolio. I will be sharing my thoughts, ideas, and projects
				here.
			</p>
			<div className="my-8">
				<Suspense fallback={<div>Loading...</div>}>
					<BlogPosts />
				</Suspense>
			</div>
		</section>
	);
}
