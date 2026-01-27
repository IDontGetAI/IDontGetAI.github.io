import { describe, expect, it, vi } from "vitest";

describe("location helpers", () => {
  it("extracts query from hash first", async () => {
    const mod = await import("./location");
    const query = mod.getQueryStringFromSnapshot({
      hash: "#/note-viewer?src=abc&title=hi",
      search: "?src=should_not_use",
    });
    expect(query).toBe("src=abc&title=hi");
  });

  it("falls back to search when hash has no query", async () => {
    const mod = await import("./location");
    const query = mod.getQueryStringFromSnapshot({
      hash: "#/note-viewer",
      search: "?src=abc&title=hi",
    });
    expect(query).toBe("src=abc&title=hi");
  });

  it("dispatches locationchange on replaceState after patching", async () => {
    if (typeof window === "undefined" || typeof history === "undefined") {
      expect(true).toBe(true);
      return;
    }

    vi.resetModules();
    const mod = await import("./location");

    const handler = vi.fn();
    window.addEventListener("locationchange", handler);

    mod.ensureLocationEvents();
    history.replaceState(null, "", "#/note-viewer?src=abc");

    await Promise.resolve();
    expect(handler).toHaveBeenCalled();

    window.removeEventListener("locationchange", handler);
  });
});
