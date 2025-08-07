import { BlogPosts } from "src/app/(public)/components/posts";
import { Suspense } from "react";

export default function Page() {
	return (
		<section>
			<h1 className="my-6 text-3xl font-semibold">👋 {"I'm"} Ian Duvall</h1>
			<p className="my-4">
				Welcome to my site! I use this space to share my thoughts and explore
				new technologies. This current iteration is built with Next.js and React
				Server Components. Overkill for a personal site? Absolutely, but{" "}
				{"it's"}
				fun to try new things.
			</p>

			<section>
				<h2 className="mb-3 mt-5 text-2xl font-semibold tracking-tighter">
					About
				</h2>
				<p className="my-2">
					{"I'm"} a software engineer passionate about building highly
					interactive web applications. I currently work at{" "}
					<a href="https://www.summation.com/" target="_blank">
						Summation AI
					</a>{" "}
					as a Senior Product Engineer, integrating AI into the enterprise
					financial planning and analysis (FP&A) space.
				</p>
				<p className="my-2">
					Previously, I was a Senior Software Engineer at{" "}
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
					team. I primarily worked on the frontend with React and TypeScript,
					while also contributing to backend development with Django and Python.
					My goldilocks zone lies at the intersection of solving complex
					technical problems and collaborating with Product and Design teams to
					create exceptional user experiences.
				</p>
			</section>

			<section>
				<h2 className="mb-3 mt-5 text-2xl font-semibold tracking-tighter">
					Education
				</h2>
				<p className="my-2">
					I hold a Bachelor of Science in Engineering (Computer Science) from
					the University of Michigan, graduating in 2017.
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
