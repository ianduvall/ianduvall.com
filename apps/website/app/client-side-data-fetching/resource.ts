import { getCharacters, getCharacter } from "rickmortyapi";

type CacheEntryStatus = "fresh" | "stale" | "revalidating";
type StatusUpdater =
	| CacheEntryStatus
	| ((previous: CacheEntryStatus) => CacheEntryStatus);
interface ResourceCacheEntry<TPromise> {
	promise: TPromise;
	revalidatingPromise: TPromise | undefined;
	status: CacheEntryStatus;
}
type Cache<TData> = Map<string, ResourceCacheEntry<TData>>;
interface Resource<TFetcher extends (input: any) => any> {
	read: TFetcher;
	preload: (input: Parameters<TFetcher>[0]) => void;
	get: (
		input: Parameters<TFetcher>[0],
	) => ResourceCacheEntry<Promise<any>> | undefined;
	expire: (input: Parameters<TFetcher>[0]) => void;
	expireAll: () => void;
}

function createResource<const TFetcher extends (input: any) => any>({
	fetcher,
}: {
	fetcher: TFetcher;
}): Resource<TFetcher> {
	const cache: Cache<any> = new Map();

	const setStatus = (
		cacheEntry: ResourceCacheEntry<any>,
		updater: StatusUpdater,
	): void => {
		const previous = cacheEntry.status;
		const next = typeof updater === "string" ? updater : updater(previous);
		if (Object.is(previous, next)) {
			return;
		}

		cacheEntry.status = next;
	};

	const fetchAndCache = (
		input: Parameters<TFetcher>[0],
		cacheKey: string = stableStringify(input),
	): ReturnType<TFetcher> => {
		const promise = fetcher(input);
		const cacheEntry: ResourceCacheEntry<Promise<any>> = {
			promise,
			revalidatingPromise: undefined,
			status: "fresh",
		};
		cache.set(cacheKey, cacheEntry);

		return promise;
	};

	const revalidate = (
		input: Parameters<TFetcher>[0],
		cacheKey: string = stableStringify(input),
	): void => {
		const cacheEntry = cache.get(cacheKey);
		if (!cacheEntry) {
			return;
		}
		const revalidatingPromise = fetcher(input);
		setStatus(cacheEntry, "revalidating");
		cacheEntry.revalidatingPromise = revalidatingPromise;
		revalidatingPromise
			.then(() => {
				cacheEntry.promise = revalidatingPromise;
				setStatus(cacheEntry, "fresh");
			})
			.catch(() => {
				setStatus(cacheEntry, "stale");
				cacheEntry.revalidatingPromise = undefined;
			});
	};

	// @ts-expect-error
	const read: TFetcher = (input) => {
		const cacheKey = stableStringify(input);

		const cachedEntry = cache.get(cacheKey);
		if (cachedEntry) {
			if (cachedEntry.status === "stale") {
				// stale while revalidate
				revalidate(input, cacheKey);
			}
			return cachedEntry.promise;
		}

		return fetchAndCache(input, cacheKey);
	};
	const preload = (input: Parameters<TFetcher>[0]): void => void read(input);
	const get = (input: Parameters<TFetcher>[0]) =>
		cache.get(stableStringify(input));
	const expire = (input: Parameters<TFetcher>[0]): void => {
		const cacheKey = stableStringify(input);
		const cacheEntry = cache.get(cacheKey);
		if (cacheEntry) {
			setStatus(cacheEntry, "stale");
		}
	};
	const expireAll = (): void => {
		cache.forEach((cacheEntry) => {
			setStatus(cacheEntry, "stale");
		});
	};

	const resource = {
		read,
		preload,
		get,
		expire,
		expireAll,
		// internals are prefixed with an underscore
		_cache: cache,
	};

	return resource;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
	value !== null && typeof value === "object" && value.constructor === Object;
const stableStringify = (value: unknown): string => {
	if (Array.isArray(value)) {
		return value.map(stableStringify).toString();
	} else if (isPlainObject(value)) {
		return Object.keys(value)
			.sort()
			.map((key) => `${key}:${stableStringify(value[key])}`)
			.toString();
	}

	return JSON.stringify(value);
};

export const charactersResource = createResource({
	fetcher: getCharacters,
});

export const characterResource = createResource({
	fetcher: getCharacter,
});
