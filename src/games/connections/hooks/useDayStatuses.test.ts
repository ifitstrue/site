import { describe, it, expect, beforeEach } from "vitest";
import { getDayStatuses } from "./useDayStatuses";

const STORAGE_KEY = "connections_progress";

function snap(gameStatus: string, mistakes: number) {
  return {
    gameStatus, mistakes,
    revealedCategories: [], selections: [], tilePositions: {},
    hintCategory: null, hintStep: 0, previousGuesses: [],
  };
}

describe("getDayStatuses", () => {
  beforeEach(() => localStorage.clear());

  it("returns empty object when no progress saved", () => {
    expect(getDayStatuses()).toEqual({});
  });

  it("maps won, lost, and playing statuses", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      "2026-04-28": snap("won", 1),
      "2026-04-27": snap("lost", 4),
      "2026-04-26": snap("playing", 2),
    }));
    const statuses = getDayStatuses();
    expect(statuses["2026-04-28"]).toEqual({ status: "won", mistakes: 1 });
    expect(statuses["2026-04-27"]).toEqual({ status: "lost", mistakes: 4 });
    expect(statuses["2026-04-26"]).toEqual({ status: "playing", mistakes: 2 });
  });

  it("re-reads localStorage each time called", () => {
    expect(getDayStatuses()).toEqual({});

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      "2026-04-28": snap("won", 0),
    }));
    const statuses = getDayStatuses();
    expect(statuses["2026-04-28"]).toEqual({ status: "won", mistakes: 0 });
  });

  it("reflects storage changes when called again with fresh data", () => {
    // Initial state - no data
    expect(getDayStatuses()).toEqual({});

    // Add a winning game
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      "2026-04-29": snap("won", 2),
    }));
    let statuses = getDayStatuses();
    expect(statuses).toHaveProperty("2026-04-29");
    expect(statuses["2026-04-29"].status).toBe("won");

    // Update to a lost game (same date)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      "2026-04-29": snap("lost", 4),
    }));
    statuses = getDayStatuses();
    expect(statuses["2026-04-29"].status).toBe("lost");
    expect(statuses["2026-04-29"].mistakes).toBe(4);

    // Add another date
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      "2026-04-29": snap("lost", 4),
      "2026-04-28": snap("playing", 1),
    }));
    statuses = getDayStatuses();
    expect(Object.keys(statuses)).toHaveLength(2);
    expect(statuses["2026-04-28"].status).toBe("playing");
  });

  it("returns empty object after localStorage is cleared", () => {
    localStorage.clear();
    expect(getDayStatuses()).toEqual({});
  });
});
