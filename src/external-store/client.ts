"use client";

import { startTransition, useEffect, useState } from "react";
import type { ExternalStore } from "./store";

export const useStore = <State, Action>(
	store: ExternalStore<State, Action>,
) => {
	const [snapshot, setSnapshot] = useState(() => store.snapshot());

	useEffect(() => {
		const handleUpdate = () => {
			startTransition(() => {
				setSnapshot(store.snapshot());
			});
		};
		handleUpdate();

		return store.subscribe(handleUpdate);
	}, [store]);

	return snapshot;
};
