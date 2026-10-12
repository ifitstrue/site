import { describe, expect, it } from "vitest";
import { formatLocalDate, isDateInRange } from "./date";

describe("formatLocalDate", () => {
  it("uses the visitor's calendar date instead of UTC", () => {
    expect(formatLocalDate(new Date(2026, 9, 12, 23, 30))).toBe("2026-10-12");
  });
});

describe("isDateInRange", () => {
  it.each(["2026-02-30", "2026-13-01", "not-a-date"])(
    "rejects invalid date %s",
    (date) => {
      expect(isDateInRange(date, "2021-06-19", "2026-10-12")).toBe(false);
    },
  );

  it("rejects dates before launch and after today", () => {
    expect(isDateInRange("2021-06-18", "2021-06-19", "2026-10-12")).toBe(false);
    expect(isDateInRange("2026-10-13", "2021-06-19", "2026-10-12")).toBe(false);
  });

  it("accepts both ends of the allowed range", () => {
    expect(isDateInRange("2021-06-19", "2021-06-19", "2026-10-12")).toBe(true);
    expect(isDateInRange("2026-10-12", "2021-06-19", "2026-10-12")).toBe(true);
  });
});
