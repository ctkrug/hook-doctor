import { describe, expect, it } from "vitest";
import { escapeHtml } from "../../src/ui/escapeHtml";

describe("escapeHtml", () => {
  it("escapes angle brackets and ampersands", () => {
    expect(escapeHtml("<script>alert(1)</script> & co")).toBe(
      "&lt;script&gt;alert(1)&lt;/script&gt; &amp; co",
    );
  });

  it("escapes quotes", () => {
    expect(escapeHtml(`He said "hi" and 'bye'`)).toBe(
      "He said &quot;hi&quot; and &#39;bye&#39;",
    );
  });

  it("leaves plain text unchanged", () => {
    expect(escapeHtml("plain text, no markup.")).toBe("plain text, no markup.");
  });

  it("handles empty input", () => {
    expect(escapeHtml("")).toBe("");
  });
});
