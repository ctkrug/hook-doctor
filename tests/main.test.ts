import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

async function mountApp(): Promise<void> {
  document.body.innerHTML = '<div id="app"></div>';
  vi.resetModules();
  await import("../src/main");
}

describe("main", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  it("renders a designed empty state on load, not a blank panel", async () => {
    await mountApp();
    const body = document.querySelector("#diagnosis-body");
    expect(body?.innerHTML).toContain("state-message");
    expect(body?.textContent?.trim().length).toBeGreaterThan(0);
  });

  it("re-diagnoses 400ms after the user stops typing, without a manual click", async () => {
    await mountApp();
    const input = document.querySelector<HTMLTextAreaElement>("#input")!;
    input.value = "It was a nice day and Sarah walked to the store.";
    input.dispatchEvent(new Event("input"));

    vi.advanceTimersByTime(399);
    expect(document.querySelector("#diagnosis-body")?.innerHTML).toContain(
      "state-message",
    );

    vi.advanceTimersByTime(1);
    expect(document.querySelector("#diagnosis-body")?.innerHTML).toContain(
      "score-dial",
    );
  });

  it("does not re-diagnose on every keystroke during rapid typing", async () => {
    await mountApp();
    const input = document.querySelector<HTMLTextAreaElement>("#input")!;
    for (const char of ["I", "It", "It ", "It w"]) {
      input.value = char;
      input.dispatchEvent(new Event("input"));
      vi.advanceTimersByTime(100);
    }
    expect(document.querySelector("#diagnosis-body")?.innerHTML).toContain(
      "state-message",
    );
  });

  it("clicking Diagnose scores immediately, bypassing the debounce", async () => {
    await mountApp();
    const input = document.querySelector<HTMLTextAreaElement>("#input")!;
    const button = document.querySelector<HTMLButtonElement>("#diagnose")!;
    input.value = "Call me Ishmael.";
    input.dispatchEvent(new Event("input"));
    button.click();
    expect(document.querySelector("#diagnosis-body")?.innerHTML).toContain(
      "score-dial",
    );
  });

  it("copies the result summary to the clipboard and shows confirmation feedback", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    await mountApp();
    const input = document.querySelector<HTMLTextAreaElement>("#input")!;
    const diagnoseButton =
      document.querySelector<HTMLButtonElement>("#diagnose")!;
    const copyButton = document.querySelector<HTMLButtonElement>("#copy")!;

    input.value = "Call me Ishmael.";
    input.dispatchEvent(new Event("input"));
    diagnoseButton.click();

    expect(copyButton.disabled).toBe(false);
    copyButton.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(copyButton.textContent).toBe("Copied");
  });

  it("keeps the copy button disabled when there is nothing to copy yet", async () => {
    await mountApp();
    const copyButton = document.querySelector<HTMLButtonElement>("#copy")!;
    expect(copyButton.disabled).toBe(true);
  });

  it("shows a truncation notice and still scores extremely long input without freezing", async () => {
    await mountApp();
    const input = document.querySelector<HTMLTextAreaElement>("#input")!;
    const button = document.querySelector<HTMLButtonElement>("#diagnose")!;
    const wordCount = document.querySelector<HTMLSpanElement>("#word-count")!;

    const longInput = "word ".repeat(2500).trim();
    input.value = longInput;
    input.dispatchEvent(new Event("input"));
    button.click();

    expect(wordCount.textContent).toContain("2500 words");
    expect(wordCount.textContent).toMatch(/first 2000/);
    expect(wordCount.classList.contains("is-over-limit")).toBe(true);
    expect(document.querySelector("#diagnosis-body")?.innerHTML).toContain(
      "score-dial",
    );
  });
});
