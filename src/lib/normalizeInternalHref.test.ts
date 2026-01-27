import { describe, expect, it } from "vitest";
import { normalizeInternalHref } from "./normalizeInternalHref";

describe("normalizeInternalHref", () => {
  it("defaults to root for empty", () => {
    expect(normalizeInternalHref("")).toBe("/");
    expect(normalizeInternalHref("   ")).toBe("/");
  });

  it("adds leading slash for internal paths", () => {
    expect(normalizeInternalHref("lit")).toBe("/lit");
    expect(normalizeInternalHref("note-viewer?src=1&title=2")).toBe(
      "/note-viewer?src=1&title=2"
    );
  });

  it("keeps already normalized href", () => {
    expect(normalizeInternalHref("/lit")).toBe("/lit");
    expect(normalizeInternalHref("/note-viewer?src=1")).toBe("/note-viewer?src=1");
  });

  it("converts legacy '?query#/path' into '/path?query'", () => {
    expect(normalizeInternalHref("?a=1#/lit")).toBe("/lit?a=1");
    expect(normalizeInternalHref("?src=1&title=2#/note-viewer")).toBe(
      "/note-viewer?src=1&title=2"
    );
  });

  it("compresses viewer src param for giscus-friendly urls", () => {
    const input = "/pdf-viewer?src=https%3A%2F%2Fgithub.com%2Fo%2Fr%2Fblob%2Fmain%2Fdocs%2Fa.pdf&title=hi";
    expect(normalizeInternalHref(input)).toBe(
      "/pdf-viewer?src=ghs%2Fo%2Fr%2Fmain%2Fdocs%2Fa.pdf&title=hi"
    );
  });
});
