import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "./route";

describe("Connections API", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("rejects impossible and future dates without contacting the upstream API", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-13T02:00:00.000Z"));
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    for (const date of ["2026-02-30", "2026-10-13"]) {
      const response = await GET(
        new NextRequest(`https://example.com/api/connections/${date}`),
        { params: Promise.resolve({ date }) },
      );
      expect(response.status).toBe(400);
    }
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fetches a valid historical puzzle through the cached upstream request", async () => {
    const payload = { categories: [] };
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchSpy);

    const response = await GET(
      new NextRequest("https://example.com/api/connections/2023-06-12"),
      { params: Promise.resolve({ date: "2023-06-12" }) },
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(payload);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://www.nytimes.com/svc/connections/v2/2023-06-12.json",
      { next: { revalidate: 86400 } },
    );
  });
});
