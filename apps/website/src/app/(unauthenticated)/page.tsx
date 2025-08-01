import { BlogPosts } from "src/app/(unauthenticated)/components/posts";
import { Suspense } from "react";

export default function Page() {
	return (
		<section>
			<h1 className="my-6 text-3xl font-semibold">👋 {"I'm"} Ian Duvall</h1>
			<p className="my-4">
				Welcome to my site! I use this site to share my thoughts and as a
				playground to experiment with new tech. This current iteration is built
				with Next.js and React Server Components. Overkill for a personal site?
				Definitely but {"it's"} more about the learning.
			</p>

			<section>
				<h2 className="mb-3 mt-5 text-2xl font-semibold tracking-tighter">
					About
				</h2>
				<p className="my-2">
					{"I'm"} a software engineer focused on building highly interactive
					apps on the web. I currently work at{" "}
					<a href="https://www.summation.com/" target="_blank">
						Summation AI
					</a>{" "}
					as a Senior Product Engineer building AI into the enterprise FP&A
					space.
				</p>
				<p className="my-2">
					Previously, I worked as a Senior Software Engineer at{" "}
					<a href="https://sproutsocial.com/" target="_blank">
						Sprout Social
					</a>{" "}
					on the{" "}
					<a
						href="https://sproutsocial.com/features/social-media-analytics/"
						target="_blank"
					>
						Analytics
					</a>{" "}
					team. I work on the frontend with React and Typescript and the backend
					with Django and Python. My goldilocks zone is between solving hard
					technical problems and working with product and design to craft
					amazing user experiences.
				</p>
			</section>

			<section>
				<h2 className="mb-3 mt-5 text-2xl font-semibold tracking-tighter">
					Education
				</h2>
				<p className="my-2">
					I graduated in 2017 from the University of Michigan with a BSE in
					Computer Science Engineering.
				</p>
			</section>
			<section>
				<h2 className="mb-3 mt-5 text-2xl font-semibold tracking-tighter">
					Recent writing
				</h2>
			</section>
			<div className="my-3">
				<Suspense fallback={<div>Loading blog posts...</div>}>
					<BlogPosts recent={3} />
				</Suspense>
			</div>
		</section>
	);
}
