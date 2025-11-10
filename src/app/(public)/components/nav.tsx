import type { ComponentProps, PropsWithChildren } from "react";
import { Link } from "src/app/components/link";

export function Nav() {
	return (
		<header className="mb-4 -ml-2 tracking-tight">
			<nav
				className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
				id="nav"
			>
				<div className="flex w-full items-center justify-between">
					<ul className="flex flex-row space-x-0 pr-10 text-2xl">
						<NavLinkItem href="/">home</NavLinkItem>
						<NavLinkItem href="/blog">blog</NavLinkItem>
						<NavLinkItem href="/chat">chat</NavLinkItem>
					</ul>
					<div className="flex items-center space-x-4">{/* right */}</div>
				</div>
			</nav>
		</header>
	);
}

const NavLinkItem = (props: PropsWithChildren<ComponentProps<typeof Link>>) => {
	return (
		<li className="relative m-1 flex px-2 py-1 align-middle">
			<Link {...props} prefetch />
		</li>
	);
};
