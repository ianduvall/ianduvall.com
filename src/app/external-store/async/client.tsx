"use client";

import { PromiseCache } from "src/promise-store/store";
import { use, useState, createContext } from "react";
import { usePromiseCache } from "src/promise-store/client";

const clientSearch = async (search: string): Promise<string[]> => {
	console.log("Client search called");

	return new Promise((r) =>
		setTimeout(r, 500, [
			`${search} - ${Math.random().toFixed(4)}`,
			`${search} - ${Math.random().toFixed(4)}`,
			`${search} - ${Math.random().toFixed(4)}`,
		]),
	);
};

const PromiseCacheContext = createContext<PromiseCache<string, string[]>>(
	null!,
);

export default function ClientPage({
	initialCacheObject,
}: {
	initialCacheObject?: Record<string, Promise<string[]>>;
}) {
	const [promiseCache] = useState(() => {
		return new PromiseCache({
			asyncFn: clientSearch,
			initialCacheObject,
		});
	});
	return (
		<PromiseCacheContext value={promiseCache}>
			<DisplayResult />
			<InvalidateButton />
		</PromiseCacheContext>
	);
}

const DisplayResult = () => {
	const promiseCache = use(PromiseCacheContext);
	const promise = usePromiseCache(promiseCache, "React");
	const result = use(promise);

	return (
		<div>
			{result.map((item) => (
				<div key={item}>{item}</div>
			))}
		</div>
	);
};

const InvalidateButton = () => {
	const promiseCache = use(PromiseCacheContext);

	return (
		<button
			className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
			onClick={() =>
				promiseCache.dispatch({ type: "invalidate", input: "React" })
			}
		>
			Invalidate Cache
		</button>
	);
};
