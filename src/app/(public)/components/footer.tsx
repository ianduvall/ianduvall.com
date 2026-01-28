import { Link } from "src/app/components/link";

export function Footer() {
	return (
		<footer className="mt-auto">
			<ul className="font-sm mt-8 flex flex-col space-y-2 space-x-0 text-gray-600 md:flex-row md:space-y-0 md:space-x-4 dark:text-gray-300">
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						target="_blank"
						href="/rss"
						prefetch={false}
					>
						<span className="ml-2 h-7">rss</span>
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						target="_blank"
						href="https://github.com/ianduvall"
					>
						<span className="ml-2 h-7">github</span>
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						target="_blank"
						href="https://github.com/ianduvall/ianduvall.com"
					>
						<span className="ml-2 h-7">view source</span>
					</Link>
				</li>
			</ul>
		</footer>
	);
}
