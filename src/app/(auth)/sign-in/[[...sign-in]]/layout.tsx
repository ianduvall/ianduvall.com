import type { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex h-screen items-center justify-center">{children}</div>
	);
}
