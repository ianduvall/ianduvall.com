import { Suspense } from "react";
import ClientPage from "./client";
import { dummySearch } from "./server";

export default function PromiseCachePage() {
	const initialCacheObject = { React: dummySearch("React") };

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ClientPage initialCacheObject={initialCacheObject} />
		</Suspense>
	);
}
