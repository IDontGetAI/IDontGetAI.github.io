import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchWithCache } from "@/lib/httpCache";
import { devLog } from "@/lib/location";

type UseCachedTextState = {
  text: string;
  loading: boolean;
  error: string | null;
  fromCache: boolean;
  retry: (options?: { bypassCache?: boolean }) => void;
};

export function useCachedText(url: string, options?: { cacheName?: string }): UseCachedTextState {
  const cacheName = options?.cacheName || "idontgetai-text-v1";
  const [revision, setRevision] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const retryOptionsRef = useRef<{ bypassCache?: boolean } | undefined>(undefined);

  const retry = useCallback((opts?: { bypassCache?: boolean }) => {
    retryOptionsRef.current = opts;
    setRevision((v) => v + 1);
  }, []);

  const key = useMemo(() => `${url}::${cacheName}::${revision}`, [url, cacheName, revision]);

  useEffect(() => {
    if (!url) {
      setText("");
      setLoading(false);
      setError(null);
      setFromCache(false);
      return;
    }

    const controller = new AbortController();
    const bypassCache = retryOptionsRef.current?.bypassCache ?? false;
    retryOptionsRef.current = undefined;
    const maxRetries = 2;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => resolve(), ms);
        controller.signal.addEventListener(
          "abort",
          () => {
            window.clearTimeout(id);
            resolve();
          },
          { once: true }
        );
      });

    queueMicrotask(() => {
      setLoading(true);
      setError(null);
    });

    devLog("text.fetch.start", { url, cacheName, bypassCache });

    (async () => {
      let lastError: unknown = null;
      for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        if (controller.signal.aborted) return;
        try {
          const { response, fromCache: hit } = await fetchWithCache(url, {
            cacheName,
            bypassCache,
            signal: controller.signal,
          });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          const value = await response.text();
          if (controller.signal.aborted) return;
          setText(value);
          setFromCache(hit);
          setLoading(false);
          devLog("text.fetch.success", { url, cacheName, fromCache: hit, bytes: value.length });
          return;
        } catch (e) {
          if (controller.signal.aborted) return;
          lastError = e;
          if (attempt < maxRetries) {
            const waitMs = 800 * (attempt + 1);
            devLog("text.fetch.retry", { url, cacheName, attempt: attempt + 1, waitMs });
            await sleep(waitMs);
            continue;
          }
        }
      }

      const message = lastError instanceof Error ? lastError.message : String(lastError);
      setError(message);
      setLoading(false);
      setFromCache(false);
      devLog("text.fetch.error", { url, cacheName, error: message });
    })();

    return () => controller.abort();
  }, [key, url, cacheName]);

  return { text, loading, error, fromCache, retry };
}
