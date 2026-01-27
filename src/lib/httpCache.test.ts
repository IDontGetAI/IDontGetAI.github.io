import { describe, expect, it, vi } from "vitest";

describe("fetchWithCache", () => {
  it("falls back to plain fetch when Cache API is unavailable", async () => {
    const originalCaches = (globalThis as any).caches;
    (globalThis as any).caches = undefined;

    const fetchMock = vi.fn(async () => new Response("ok", { status: 200 }));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as any;

    const { fetchWithCache } = await import("./httpCache");
    const result = await fetchWithCache("https://example.com/a.txt", { cacheName: "t" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.fromCache).toBe(false);
    expect(await result.response.text()).toBe("ok");

    globalThis.fetch = originalFetch;
    (globalThis as any).caches = originalCaches;
  });
});

