import { BlogPosts } from "app/components/posts";
import { Suspense } from "react";

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				👋 I'm Ian
			</h1>
			<p className="mb-4">
				Welcome to my site! I'm currently working at Sprout Social as a Senior
				Software Engineer on the Analytics team.
			</p>
			<div className="my-8">
				<Suspense fallback={<div>Loading...</div>}>
					<BlogPosts />
				</Suspense>
			</div>
		</section>
	);
}
