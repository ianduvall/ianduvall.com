import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export async function AuthButton() {
	return (
		<>
			<SignedIn>
				<UserButton afterSignOutUrl="/" />
			</SignedIn>
			<SignedOut>
				<SignInButton>
					<button className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500">
						Sign In
					</button>
				</SignInButton>
			</SignedOut>
		</>
	);
}
