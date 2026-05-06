import { getCalendarCells, formatMonthYear, formatDisplayDate, addDays } from "./calendarUtils";

describe("getCalendarCells", () => {
  it("always returns 42 cells (6 rows × 7 cols)", () => {
    expect(getCalendarCells(2026, 3).length).toBe(42); // April 2026
    expect(getCalendarCells(2026, 1).length).toBe(42); // February 2026
  });

  it("first cell of April 2026 is March 29 (April 1 is Wednesday = day 3)", () => {
    const cells = getCalendarCells(2026, 3);
    expect(cells[0].date).toBe("2026-03-29");
    expect(cells[0].isCurrentMonth).toBe(false);
  });

  it("includes all 30 days of April in current-month cells", () => {
    const cells = getCalendarCells(2026, 3);
    const current = cells.filter((c) => c.isCurrentMonth);
    expect(current.length).toBe(30);
    expect(current[0].date).toBe("2026-04-01");
    expect(current[29].date).toBe("2026-04-30");
  });

  it("handles January (no previous-month overflow needed when month starts on Sunday)", () => {
    // Jan 2023 starts on Sunday
    const cells = getCalendarCells(2023, 0);
    expect(cells[0].date).toBe("2023-01-01");
    expect(cells[0].isCurrentMonth).toBe(true);
  });
});

describe("formatMonthYear", () => {
  it("formats month and year", () => {
    expect(formatMonthYear(2026, 3)).toBe("April 2026");
    expect(formatMonthYear(2026, 0)).toBe("January 2026");
    expect(formatMonthYear(2025, 11)).toBe("December 2025");
  });
});

describe("formatDisplayDate", () => {
  it("formats YYYY-MM-DD as Month D, YYYY", () => {
    expect(formatDisplayDate("2026-04-29")).toBe("April 29, 2026");
    expect(formatDisplayDate("2026-01-01")).toBe("January 1, 2026");
  });
});

describe("addDays", () => {
  it("advances a date by N days", () => {
    expect(addDays("2026-04-30", 1)).toBe("2026-05-01");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
    expect(addDays("2026-03-31", 1)).toBe("2026-04-01");
  });
});
