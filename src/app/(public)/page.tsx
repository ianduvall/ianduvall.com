import { Suspense } from "react";
import { BlogPosts, LoadingBlogPost } from "src/app/(public)/components/blog-posts";
import { Heading } from "../components/heading";
import { Link } from "../components/link";

export default function Page() {
	return (
		<section>
			<Heading level={1} className="heading-offset my-6 text-3xl font-semibold">
				👋 {"I'm"} Ian Duvall
			</Heading>
			<p className="my-4">
				Welcome to my site! I use this space to share my thoughts and explore new technologies. This
				current iteration is built with Next.js and React Server Components. Overkill for a personal
				site? Absolutely, but {"it's"} fun to try new things.
			</p>

			<section>
				<Heading
					level={2}
					className="heading-offset mt-5 mb-3 text-2xl font-semibold tracking-tighter"
				>
					About
				</Heading>
				<p className="my-2">
					{"I'm"} a software engineer who likes building ambitious, highly interactive web
					applications. The work I enjoy most sits between hard technical problems and close
					collaboration with Product and Design to make the end result feel coherent, polished, and
					useful.
				</p>
				<p className="my-2">
					I previously worked at{" "}
					<Link href="https://www.summation.com/" target="_blank">
						Summation
					</Link>{" "}
					and{" "}
					<Link href="https://sproutsocial.com/" target="_blank">
						Sprout Social
					</Link>
					.
				</p>
			</section>

			<section>
				<Heading
					level={2}
					className="heading-offset mt-5 mb-3 text-2xl font-semibold tracking-tighter"
				>
					Education
				</Heading>
				<p className="my-2">
					I earned a Bachelor of Science in Engineering in Computer Science from the University of
					Michigan in 2017.
				</p>
			</section>
			<section>
				<Heading
					level={2}
					className="heading-offset mt-5 mb-3 text-2xl font-semibold tracking-tighter"
				>
					Recent writing
				</Heading>
			</section>
			<div className="my-4 space-y-3">
				<Suspense
					fallback={
						<div className="space-y-3">
							<span className="sr-only">Loading recent blog posts...</span>
							<LoadingBlogPost />
							<LoadingBlogPost />
							<LoadingBlogPost />
						</div>
					}
				>
					<BlogPosts key="blog-posts" recent={3} viewTransitions={false} />
				</Suspense>
			</div>
		</section>
	);
}
