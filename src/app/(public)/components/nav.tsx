import type { ComponentProps } from "react";
import { Link } from "src/app/components/link";

const navItems = [
	{
		children: "home",
		href: "/",
	},
	{
		children: "blog",
		href: "/blog",
	},
	{
		children: "chat",
		href: "/chat",
	},
] as const satisfies ComponentProps<typeof Link>[];

export function Nav() {
	return (
		<header className="mb-4 -ml-[8px] tracking-tight">
			<nav
				className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
				id="nav"
			>
				<div className="flex w-full items-center justify-between">
					<ul className="flex flex-row space-x-0 pr-10 text-2xl">
						{navItems.map((props) => {
							return (
								<li
									key={props.href}
									className="relative m-1 flex px-2 py-1 align-middle"
								>
									<Link {...props} prefetch />
								</li>
							);
						})}
					</ul>
					<div className="flex items-center space-x-4">{/* right */}</div>
				</div>
			</nav>
		</header>
	);
}
