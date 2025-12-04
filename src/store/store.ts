import { useEffect, useState } from "react";
import { Subscribable } from "./subscribable";

export class Store<State, Action> extends Subscribable {
	#reducer: (state: State, action: Action) => State;
	#state: State;
	#equalityFn: (a: State, b: State) => boolean = Object.is;

	constructor(
		reducer: (state: State, action: Action) => State,
		initialState: State,
		options?: { equalityFn: (a: State, b: State) => boolean },
	) {
		super();
		this.#reducer = reducer;
		this.#state = initialState;
		this.#equalityFn = options?.equalityFn ?? Object.is;
	}

	get value() {
		return this.#state;
	}

	dispatch(action: Action) {
		const nextState = this.#reducer(this.#state, action);
		if (this.#equalityFn(this.#state, nextState)) {
			return;
		}
		this.#state = nextState;
		this.notify();
	}
}

function identity<T>(x: T): T {
	return x;
}
export const useStore = <State, Result = State>(
	store: Store<State, any>,
	selector: (state: State) => Result = identity as (state: State) => Result,
): Result => {
	const [state, setState] = useState<Result>(() => selector(store.value));

	useEffect(() => {
		return store.subscribe(() => {
			setState(selector(store.value));
		});
	}, [store, selector]);

	return state;
};
