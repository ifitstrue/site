import { NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTNAME = "games-phoenix-assets-prd.s3.us-east-1.amazonaws.com";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return new NextResponse("Missing url", { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return new NextResponse("Invalid url", { status: 400 });
  }

  if (parsed.hostname !== ALLOWED_HOSTNAME) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return new NextResponse("Image not found", { status: res.status });

    const body = await res.arrayBuffer();
    return new NextResponse(body, {
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "image/svg+xml",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch {
    return new NextResponse("Failed to fetch image", { status: 502 });
  }
}
