import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "../../src/ui/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not call the function before the delay elapses", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 400);
    debounced("a");
    vi.advanceTimersByTime(399);
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls the function once the delay elapses", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 400);
    debounced("a");
    vi.advanceTimersByTime(400);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("collapses rapid repeated calls into a single trailing call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 400);
    debounced("a");
    vi.advanceTimersByTime(100);
    debounced("b");
    vi.advanceTimersByTime(100);
    debounced("c");
    vi.advanceTimersByTime(400);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("cancel() prevents a pending call from firing", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 400);
    debounced("a");
    debounced.cancel();
    vi.advanceTimersByTime(1000);
    expect(fn).not.toHaveBeenCalled();
  });
});
