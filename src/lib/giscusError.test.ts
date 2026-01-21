import { describe, expect, it } from "vitest";
import { getGiscusErrorMessage, isDiscussionNotFoundError } from "./giscusError";

describe("giscusError", () => {
  it("extracts a readable message", () => {
    expect(getGiscusErrorMessage(" Discussion not found ")).toBe("Discussion not found");
    expect(getGiscusErrorMessage(new Error("boom"))).toBe("boom");
    expect(getGiscusErrorMessage({ error: "x" })).toContain("error");
  });

  it("detects discussion not found", () => {
    expect(isDiscussionNotFoundError("Discussion not found")).toBe(true);
    expect(isDiscussionNotFoundError("DISCUSSION NOT FOUND")).toBe(true);
    expect(isDiscussionNotFoundError("Category not found")).toBe(false);
  });
});

