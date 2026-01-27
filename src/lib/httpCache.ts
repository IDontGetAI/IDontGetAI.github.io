import { devLog } from "@/lib/location";

export type FetchWithCacheResult = {
  response: Response;
  fromCache: boolean;
};

type FetchWithCacheOptions = {
  cacheName: string;
  bypassCache?: boolean;
  signal?: AbortSignal;
  init?: RequestInit;
};

export async function fetchWithCache(url: string, options: FetchWithCacheOptions): Promise<FetchWithCacheResult> {
  const { cacheName, bypassCache = false, signal, init } = options;
  const method = (init?.method || "GET").toUpperCase();
  const cacheAvailable = typeof caches !== "undefined" && method === "GET";

  if (cacheAvailable && !bypassCache) {
    try {
      const cache = await caches.open(cacheName);
      const cached = await cache.match(url);
      if (cached) {
        devLog("cache.hit", { cacheName, url });
        return { response: cached.clone(), fromCache: true };
      }
      devLog("cache.miss", { cacheName, url });
    } catch (error) {
      devLog("cache.unavailable", { cacheName, url, error: String(error) });
    }
  }

  const response = await fetch(url, { ...init, signal });

  if (cacheAvailable && response.ok && response.type !== "opaque") {
    try {
      const cache = await caches.open(cacheName);
      await cache.put(url, response.clone());
      devLog("cache.put", { cacheName, url, status: response.status });
    } catch (error) {
      devLog("cache.put_failed", { cacheName, url, error: String(error) });
    }
  }

  return { response, fromCache: false };
}

