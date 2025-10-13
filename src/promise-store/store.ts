import { ExternalStore } from "../external-store/store";

type State<TData> = Promise<TData>;
type Action<TInput> = { type: "invalidate"; input: TInput };

type StoreState<TData> = State<TData> | undefined;
type StoreAction<TData> =
	| { type: "clear" }
	| { type: "set"; payload: State<TData> };

const createPromiseStore = <TData>(initial: StoreState<TData>) =>
	new ExternalStore<StoreState<TData>, StoreAction<TData>>((state, action) => {
		switch (action.type) {
			case "set": {
				return action.payload;
			}
			case "clear": {
				return undefined;
			}
			default: {
				return state;
			}
		}
	}, initial);

export class PromiseCache<TInput, TData> {
	#cache: Map<TInput, ExternalStore<StoreState<TData>, StoreAction<TData>>>;
	#asyncFn: (input: TInput) => Promise<TData>;

	constructor(options: {
		asyncFn: (input: TInput) => Promise<TData>;
		initialCacheObject?: Record<string, Promise<TData>>;
	}) {
		this.#cache = new Map(
			options.initialCacheObject
				? Object.entries(options.initialCacheObject).map(([key, promise]) => [
						key as unknown as TInput,
						createPromiseStore(promise),
					])
				: [],
		);
		this.#asyncFn = options.asyncFn;
	}

	snapshot(input: TInput): Promise<TData> {
		let store = this.#cache.get(input);

		if (!store) {
			const promise = this.#asyncFn(input);
			store = createPromiseStore(promise);
			this.#cache.set(input, store);
			return promise;
		}

		let promise = store.snapshot();
		if (!promise) {
			promise = this.#asyncFn(input);
			store.dispatch({ type: "set", payload: promise });
		}

		return promise;
	}

	dispatch(action: Action<TInput>) {
		switch (action.type) {
			case "invalidate": {
				this.#cache.get(action.input)?.dispatch({ type: "clear" });
				break;
			}
		}
	}

	subscribe(input: TInput, listener: () => void) {
		const store = this.#cache.get(input);
		if (!store) {
			return () => {};
		}
		return store.subscribe(listener);
	}
}
