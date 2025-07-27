import Link from "next/link";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

const navItems = [
	{
		name: "home",
		path: "/",
	},
	{
		name: "blog",
		path: "/blog",
	},
	{
		name: "protected",
		path: "/protected",
	},
] as const;

export function Nav() {
	return (
		<header className="-ml-[8px] mb-4 tracking-tight">
			<nav
				className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
				id="nav"
			>
				<div className="flex w-full items-center justify-between">
					<ul className="flex flex-row space-x-0 pr-10 text-2xl">
						{navItems.map(({ name, path }) => {
							return (
								<li
									key={path}
									className="relative m-1 flex px-2 py-1 align-middle"
								>
									<Link href={path}>{name}</Link>
								</li>
							);
						})}
					</ul>
					<div>{/* right */}</div>
				</div>
			</nav>
		</header>
	);
}
