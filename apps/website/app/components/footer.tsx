import Link from "next/link";

export default function Footer() {
	return (
		<footer className="mt-auto">
			<ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-gray-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-gray-300">
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						rel="noopener noreferrer"
						target="_blank"
						href="/rss"
					>
						<p className="ml-2 h-7">rss</p>
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/ianduvall"
					>
						<p className="ml-2 h-7">github</p>
					</Link>
				</li>
				<li>
					<Link
						className="flex items-center transition-all hover:text-gray-800 dark:hover:text-gray-100"
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/ianduvall/ianduvall.com"
					>
						<p className="ml-2 h-7">view source</p>
					</Link>
				</li>
			</ul>
		</footer>
	);
}
