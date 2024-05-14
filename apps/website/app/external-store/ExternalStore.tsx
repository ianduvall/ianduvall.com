"use client";

import { Button } from "app/components/button";
import { useState, useTransition } from "react";
import { Store, useSyncStoreValue, useTransitionStoreValue } from "./store";

const globalCounter = new Store(0);

export const ClientStores = ({
	serverSnapshot,
}: {
	serverSnapshot: number;
}) => {
	useState(() => {
		globalCounter.set(serverSnapshot);
	});

	return (
		<>
			<SyncStore />
			<TransitionStore />
		</>
	);
};

export const SyncStore = () => {
	const count = useSyncStoreValue(globalCounter);
	console.log({
		store: "sync store",
		count,
	});

	return (
		<div>
			<p>Sync Store</p>
			<DisplayCount count={count} store={globalCounter} />
		</div>
	);
};

export const TransitionStore = () => {
	const count = useTransitionStoreValue(globalCounter);
	console.log({
		store: "transition store",
		count,
	});

	return (
		<div>
			<p>Transition Store</p>
			<DisplayCount count={count} store={globalCounter} />
		</div>
	);
};

const DisplayCount = ({
	count,
	store,
}: {
	count: number;
	store: Store<number>;
}) => {
	const [isTransitioning, startTransition] = useTransition();

	return (
		<div>
			<p>Transitioning: {isTransitioning.toString()}</p>
			<p>Count: {count}</p>
			<Button
				onClick={() => {
					startTransition(() => {
						store.update((prev) => prev + 1);
						store.update((prev) => prev + 1);
					});
				}}
			>
				Increment
			</Button>
		</div>
	);
};
