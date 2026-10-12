import { NextRequest, NextResponse } from "next/server";
import { formatLocalDate, isDateInRange } from "@/lib/date";

const FIRST_WORDLE_DATE = "2021-06-19";

export const revalidate = 86400;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const { date } = await params;

  if (!isDateInRange(date, FIRST_WORDLE_DATE, formatLocalDate())) {
    return NextResponse.json({ error: "Date is outside the available range" }, { status: 400 });
  }

  const url = `https://www.nytimes.com/svc/wordle/v2/${date}.json`;

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch puzzle" }, { status: 502 });
  }
}
