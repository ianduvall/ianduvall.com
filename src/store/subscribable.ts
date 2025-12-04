type Callback = () => void;

export class Subscribable {
	#callbacks: Array<Callback> = [];

	subscribe(callback: Callback): () => void {
		this.#callbacks.push(callback);
		return () => {
			this.unsubscribe(callback);
		};
	}

	unsubscribe(callback: Callback) {
		const index = this.#callbacks.findIndex((cb) => cb === callback);
		if (index === -1) {
			return;
		}
		this.#callbacks.splice(index, 1);
	}

	notify() {
		for (const callback of this.#callbacks) {
			callback();
		}
	}
}
