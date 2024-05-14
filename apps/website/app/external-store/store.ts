"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

type Listener = () => void;

class Subscribable {
	listeners = new Set<Listener>();

	notify = () => {
		this.listeners.forEach((listener) => listener());
	};

	subscribe = (listener: Listener) => {
		this.listeners.add(listener);
	};

	unsubscribe = (listener: Listener) => {
		this.listeners.delete(listener);
	};
}

export class Store<Value> extends Subscribable {
	#value: Value;

	constructor(value: Value) {
		super();
		this.#value = value;
	}

	get() {
		return this.#value;
	}

	set(next: Value) {
		if (Object.is(this.#value, next)) {
			return;
		}

		this.#value = next;
		this.notify();
	}

	update(updater: (prev: Value) => Value) {
		const next = updater(this.#value);
		this.set(next);
	}
}

export const useSyncStoreValue = <T>(
	store: Store<T>,
	getServerSnapshot?: () => T,
) => {
	const getStoreValue = useCallback(() => store.get(), [store]);
	return useSyncExternalStore(
		(onStoreChange) => {
			store.subscribe(onStoreChange);
			return () => store.unsubscribe(onStoreChange);
		},
		getStoreValue,
		getServerSnapshot ?? getStoreValue,
	);
};

export const useTransitionStoreValue = <T>(
	store: Store<T>,
	getServerSnapshot?: () => T,
) => {
	const [value, setValue] = useState(getServerSnapshot ?? store.get());
	const onStoreChange = useCallback(() => {
		setValue(store.get());
	}, [store]);

	useEffect(() => {
		store.subscribe(onStoreChange);
		return () => store.unsubscribe(onStoreChange);
	}, [store, onStoreChange]);

	return value;
};
