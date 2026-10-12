import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

describe("Wordle API", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("uses the New York calendar date as the availability cutoff", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-13T02:00:00.000Z"));
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(
      new NextRequest("https://example.com/api/wordle/2026-10-13"),
      { params: Promise.resolve({ date: "2026-10-13" }) },
    );

    expect(response.status).toBe(400);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects impossible and future dates without contacting the upstream API", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    for (const date of ["2026-02-30", "9999-01-01"]) {
      const response = await GET(
        new NextRequest(`https://example.com/api/wordle/${date}`),
        { params: Promise.resolve({ date }) },
      );
      expect(response.status).toBe(400);
    }
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches a valid historical puzzle through the cached upstream request", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ solution: "rebut" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(
      new NextRequest("https://example.com/api/wordle/2021-06-19"),
      { params: Promise.resolve({ date: "2021-06-19" }) },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ solution: "rebut" });
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://www.nytimes.com/svc/wordle/v2/2021-06-19.json",
      { next: { revalidate: 86400 } },
    );
  });
});
