export class ExternalStore<State, Action> extends EventTarget {
	#value: State;
	#reducer: (state: State, action: Action) => State;
	#equalityFn: (a: State, b: State) => boolean = Object.is;

	constructor(
		reducer: (state: State, action: Action) => State,
		initial: State,
		equalityFn: (a: State, b: State) => boolean = Object.is,
	) {
		super();
		this.#reducer = reducer;
		this.#value = initial;
		this.#equalityFn = equalityFn;
	}

	#emitChange() {
		this.dispatchEvent(new Event("update"));
	}

	#update(value: State) {
		this.#value = value;
		this.#emitChange();
	}

	snapshot() {
		return this.#value;
	}

	dispatch(action: Action) {
		const nextValue = this.#reducer(this.#value, action);

		if (this.#equalityFn(this.#value, nextValue)) {
			return;
		}

		this.#update(nextValue);
	}

	subscribe(listener: () => void) {
		this.addEventListener("update", listener);
		return () => {
			this.removeEventListener("update", listener);
		};
	}
}
