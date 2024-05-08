import { getCharacters, getCharacter } from "rickmortyapi";

type CacheEntryStatus = "fresh" | "stale";
type StatusUpdater =
	| CacheEntryStatus
	| ((previous: CacheEntryStatus) => CacheEntryStatus);
interface ResourceCacheEntry<TPromise> {
	promise: TPromise;
	status: CacheEntryStatus;
	setStatus: (updater: StatusUpdater) => void;
}
type Cache<TData> = Map<string, ResourceCacheEntry<TData>>;
interface Resource<Key extends string, TFetcher extends (input: any) => any> {
	key: Key;
	read: TFetcher;
	preload: (input: Parameters<TFetcher>[0]) => void;
	get: (
		input: Parameters<TFetcher>[0],
	) => ResourceCacheEntry<Promise<any>> | undefined;
}

export const resourcesCache = new Map<string, Resource<string, any>>();

function createResource<
	const Key extends string,
	const TFetcher extends (input: any) => any,
>({ key, fetcher }: { key: Key; fetcher: TFetcher }): Resource<Key, TFetcher> {
	const cache: Cache<any> = new Map();

	const readAndCache = (
		input: Parameters<TFetcher>[0],
	): ReturnType<TFetcher> => {
		const cacheKey = stableStringify(input);

		const promise = fetcher(input);
		const cacheEntry: ResourceCacheEntry<Promise<any>> = {
			promise,
			status: "fresh",
			setStatus: (updater: StatusUpdater): void => {
				const previous = cacheEntry.status;
				const next = typeof updater === "string" ? updater : updater(previous);
				if (Object.is(previous, next)) {
					return;
				}

				cacheEntry.status = next;
			},
		};
		cache.set(cacheKey, cacheEntry);

		return promise;
	};

	// @ts-expect-error
	const read: TFetcher = (input) => {
		const cacheKey = stableStringify(input);

		const cachedEntry = cache.get(cacheKey);
		if (cachedEntry) {
			return cachedEntry.promise;
		}

		return readAndCache(input);
	};
	const preload = (input: Parameters<TFetcher>[0]): void => void read(input);
	const get = (input: Parameters<TFetcher>[0]) =>
		cache.get(stableStringify(input));
	const invalidate = (input: Parameters<TFetcher>[0]): void => {
		const cacheKey = stableStringify(input);
		const cacheEntry = cache.get(cacheKey);
		if (cacheEntry) {
			cacheEntry.setStatus("stale");
		}
	};
	const invalidateAll = (): void => {
		cache.forEach((cacheEntry) => {
			cacheEntry.setStatus("stale");
		});
	};

	const resource = {
		key,
		read,
		preload,
		get,
		invalidateAll,
		// internals are prefixed with an underscore
		_cache: cache,
	};
	resourcesCache.set(key, resource);

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
	key: "characters",
	fetcher: getCharacters,
});

export const characterResource = createResource({
	key: "character",
	fetcher: getCharacter,
});
