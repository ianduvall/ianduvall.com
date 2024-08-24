import Link from "next/link";

const navItems = [
	{
		name: "home",
		path: "/",
	},
	{
		name: "blog",
		path: "/blog",
	},
] as const;

export function Navbar() {
	return (
		<header className="mb-4 -ml-[8px] tracking-tight">
			<nav
				className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
				id="nav"
			>
				<div className="flex flex-row space-x-0 pr-10">
					{navItems.map(({ name, path }) => {
						return (
							<Link
								key={path}
								href={path}
								className="relative m-1 flex py-1 px-2 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
							>
								{name}
							</Link>
						);
					})}
				</div>
			</nav>
		</header>
	);
}
