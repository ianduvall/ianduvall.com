import { AuthButton } from "@/components/AuthButton";
import { createSQL } from "@/db/db";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

const getDBVersion = async (): Promise<string> => {
	const sql = createSQL();
	const [{ version }] = await sql`SELECT version()`;

	return version;
};

export default async function Home() {
	const session = auth();
	const dbVersion = await getDBVersion();
	const time = new Date().toISOString();

	return (
		<main className="h-screen">
			<h1>Hello world</h1>
			<ul>
				<li>DB Version: {dbVersion}</li>
				<li>Time: {time}</li>
			</ul>

			<Suspense fallback={<p>Loading...</p>}>
				<AuthButton />
			</Suspense>
			<div>session: {JSON.stringify(session, null, 2)}</div>
		</main>
	);
}
