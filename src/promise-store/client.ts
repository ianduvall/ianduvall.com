"use client";

import { startTransition, useEffect, useState } from "react";
import type { PromiseCache } from "./store";

export const usePromiseCache = <Input, Data>(
	cache: PromiseCache<Input, Data>,
	input: Input,
) => {
	const [snapshot, setSnapshot] = useState(() => cache.snapshot(input));

	useEffect(() => {
		const handleUpdate = () => {
			startTransition(() => {
				setSnapshot(cache.snapshot(input));
			});
		};
		handleUpdate();

		return cache.subscribe(input, handleUpdate);
	}, [cache, input]);

	return snapshot;
};
