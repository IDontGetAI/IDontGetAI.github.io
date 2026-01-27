import { describe, expect, it, vi } from "vitest";

describe("giscusReturnTo", () => {
  it("compresses viewer src in hash before render", async () => {
    if (typeof window === "undefined" || typeof history === "undefined") {
      expect(true).toBe(true);
      return;
    }

    vi.resetModules();
    const mod = await import("./giscusReturnTo");
    sessionStorage.clear();

    history.replaceState(
      null,
      "",
      "#/pdf-viewer?src=https%3A%2F%2Fgithub.com%2Fo%2Fr%2Fblob%2Fmain%2Fdocs%2Fa.pdf"
    );

    const changed = mod.normalizeViewerSrcParamInPlace();
    expect(changed).toBe(true);
    expect(window.location.hash).toBe(
      "#/pdf-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.pdf"
    );
  });

  it("restores last viewer url when returning from github/giscus and state is broken", async () => {
    if (typeof window === "undefined" || typeof history === "undefined") {
      expect(true).toBe(true);
      return;
    }

    vi.resetModules();
    const mod = await import("./giscusReturnTo");
    sessionStorage.clear();

    Object.defineProperty(document, "referrer", {
      value: "https://github.com/",
      configurable: true,
    });

    const returnTo = `${window.location.origin}/#/note-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.md`;

    sessionStorage.setItem("idontgetai:giscus:viewerActive", "note");
    sessionStorage.setItem("idontgetai:giscus:returnTo", returnTo);
    sessionStorage.setItem("idontgetai:giscus:returnToAt", String(Date.now()));

    history.replaceState(null, "", `${window.location.origin}/#/`);

    const restored = mod.restoreReturnToIfNeeded();
    expect(restored).toBe(true);
    expect(window.location.href).toBe(returnTo);
  });

  it("restores last viewer url when callback lands on '?giscus=...#comments'", async () => {
    if (typeof window === "undefined" || typeof history === "undefined") {
      expect(true).toBe(true);
      return;
    }

    vi.resetModules();
    const mod = await import("./giscusReturnTo");
    sessionStorage.clear();

    Object.defineProperty(document, "referrer", {
      value: "",
      configurable: true,
    });

    const returnTo = `${window.location.origin}/#/pdf-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.pdf&title=hi`;

    sessionStorage.setItem("idontgetai:giscus:viewerActive", "pdf");
    sessionStorage.setItem("idontgetai:giscus:returnTo", returnTo);
    sessionStorage.setItem("idontgetai:giscus:returnToAt", String(Date.now()));

    history.replaceState(null, "", `${window.location.origin}/?giscus=abc123#comments`);

    const restored = mod.restoreReturnToIfNeeded();
    expect(restored).toBe(true);
    expect(window.location.href).toBe(`${window.location.origin}/?giscus=abc123#/pdf-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.pdf&title=hi`);
  });

  it("does not restore when referrer is unrelated and current state is not broken", async () => {
    if (typeof window === "undefined" || typeof history === "undefined") {
      expect(true).toBe(true);
      return;
    }

    vi.resetModules();
    const mod = await import("./giscusReturnTo");
    sessionStorage.clear();

    Object.defineProperty(document, "referrer", {
      value: "https://example.com/",
      configurable: true,
    });

    const returnTo = `${window.location.origin}/#/note-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.md`;
    sessionStorage.setItem("idontgetai:giscus:viewerActive", "note");
    sessionStorage.setItem("idontgetai:giscus:returnTo", returnTo);
    sessionStorage.setItem("idontgetai:giscus:returnToAt", String(Date.now()));

    history.replaceState(null, "", returnTo);

    const restored = mod.restoreReturnToIfNeeded();
    expect(restored).toBe(false);
    expect(window.location.href).toBe(returnTo);
  });
});
