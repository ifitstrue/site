import { describe, it, expect, beforeEach } from "vitest";
import {
  getDayResult,
  recordDayResult,
  getDayResults,
  computeStreak,
  getRepairsAvailable,
  recordRepair,
  STORAGE_KEYS,
} from "./useStreak";

beforeEach(() => {
  localStorage.clear();
});

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

describe("recordDayResult / getDayResult", () => {
  it("records a win for a date", () => {
    recordDayResult("2026-04-30", "won", 0);
    expect(getDayResult("2026-04-30")).toEqual({ date: "2026-04-30", status: "won", mistakes: 0 });
  });

  it("records a loss for a date", () => {
    recordDayResult("2026-04-30", "lost", 3);
    expect(getDayResult("2026-04-30")).toEqual({ date: "2026-04-30", status: "lost", mistakes: 3 });
  });

  it("returns null for unrecorded date", () => {
    expect(getDayResult("2026-04-30")).toBeNull();
  });

  it("overwrites existing result", () => {
    recordDayResult("2026-04-30", "lost", 3);
    recordDayResult("2026-04-30", "won", 1);
    expect(getDayResult("2026-04-30")).toEqual({ date: "2026-04-30", status: "won", mistakes: 1 });
  });

  it("skips recording if identical result exists", () => {
    recordDayResult("2026-04-30", "won", 0);
    const stored = localStorage.getItem(STORAGE_KEYS.days);
    recordDayResult("2026-04-30", "won", 0);
    expect(localStorage.getItem(STORAGE_KEYS.days)).toBe(stored);
  });

  it("keeps results sorted by date", () => {
    recordDayResult("2026-04-30", "won", 0);
    recordDayResult("2026-04-28", "lost", 2);
    recordDayResult("2026-04-29", "won", 1);
    const results = getDayResults();
    expect(results.map((d) => d.date)).toEqual(["2026-04-28", "2026-04-29", "2026-04-30"]);
  });
});

describe("computeStreak", () => {
  it("returns 0 when no results", () => {
    expect(computeStreak()).toBe(0);
  });

  it("returns 1 for a single win today", () => {
    recordDayResult(daysAgo(0), "won", 0);
    expect(computeStreak()).toBe(1);
  });

  it("counts consecutive wins going backwards from most recent win", () => {
    recordDayResult(daysAgo(2), "won", 0);
    recordDayResult(daysAgo(1), "won", 0);
    recordDayResult(daysAgo(0), "won", 0);
    expect(computeStreak()).toBe(3);
  });

  it("stops at a gap", () => {
    recordDayResult(daysAgo(3), "won", 0);
    recordDayResult(daysAgo(1), "won", 0);
    recordDayResult(daysAgo(0), "won", 0);
    // daysAgo(2) was not won → break between daysAgo(3) and daysAgo(1)
    expect(computeStreak()).toBe(2); // just today and yesterday
  });

  it("ignores losses in streak count", () => {
    recordDayResult(daysAgo(2), "won", 0);
    recordDayResult(daysAgo(1), "lost", 3);
    recordDayResult(daysAgo(0), "won", 0);
    // daysAgo(1) was lost → break
    expect(computeStreak()).toBe(1);
  });

  it("does not count today unless won", () => {
    recordDayResult(daysAgo(1), "won", 0);
    // today not played
    expect(computeStreak()).toBe(1);
  });
});

describe("getRepairsAvailable", () => {
  it("returns 0 when no days recorded", () => {
    expect(getRepairsAvailable()).toBe(0);
  });

  it("returns 0 within first 30 days", () => {
    recordDayResult(daysAgo(15), "won", 0);
    expect(getRepairsAvailable()).toBe(0);
  });

  it("returns 1 after 28 days", () => {
    recordDayResult(daysAgo(29), "won", 0);
    expect(getRepairsAvailable()).toBe(1);
  });

  it("deducts used repairs", () => {
    recordDayResult(daysAgo(200), "won", 0);
    localStorage.setItem(STORAGE_KEYS.repairsUsed, JSON.stringify(["2026-03-01"]));
    expect(getRepairsAvailable()).toBe(6); // floor(200/28) - 1 = 7 - 1 = 6
  });
});

describe("recordRepair", () => {
  it("records a repair usage", () => {
    recordRepair();
    const repairs = JSON.parse(localStorage.getItem(STORAGE_KEYS.repairsUsed) || "[]");
    expect(repairs).toHaveLength(1);
    expect(repairs[0]).toBe(daysAgo(0));
  });

  it("appends to existing repairs", () => {
    localStorage.setItem(STORAGE_KEYS.repairsUsed, JSON.stringify(["2026-03-01"]));
    recordRepair();
    const repairs = JSON.parse(localStorage.getItem(STORAGE_KEYS.repairsUsed) || "[]");
    expect(repairs).toHaveLength(2);
  });
});
