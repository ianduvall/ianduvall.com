interface ThenableImpl<T> {
	then(
		onFulfill: (value: T) => unknown,
		onReject: (error: unknown) => unknown,
	): void | PromiseLike<unknown>;
}
interface UntrackedThenable<T> extends ThenableImpl<T> {
	status?: void;
}

export interface PendingThenable<T> extends ThenableImpl<T> {
	status: "pending";
}

export interface FulfilledThenable<T> extends ThenableImpl<T> {
	status: "fulfilled";
	value: T;
}

export interface RejectedThenable<T> extends ThenableImpl<T> {
	status: "rejected";
	reason: unknown;
}

export type Thenable<T> =
	| UntrackedThenable<T>
	| PendingThenable<T>
	| FulfilledThenable<T>
	| RejectedThenable<T>;

const noop = () => {};

const createFulfilledThenable = <T>(value: T): FulfilledThenable<T> => ({
	then: noop,
	status: "fulfilled",
	value,
});

const createRejectedThenable = <T>(reason: unknown): RejectedThenable<T> => ({
	then: noop,
	status: "rejected",
	reason,
});

const createThenable = <T>(promise: Promise<T>): Thenable<T> => {
	const pendingThenable: PendingThenable<T> = {
		then: promise.then,
		status: "pending",
	};

	promise
		.then((value) => {
			const fulfilled = pendingThenable as unknown as FulfilledThenable<T>;
			fulfilled.status = "fulfilled";
			fulfilled.value = value;
		})
		.catch((reason) => {
			const rejected = pendingThenable as unknown as RejectedThenable<T>;
			rejected.status = "rejected";
			rejected.reason = reason;
		});

	return pendingThenable as Thenable<T>;
};
