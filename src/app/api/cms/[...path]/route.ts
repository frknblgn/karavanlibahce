import { NextResponse } from "next/server";

const cmsBaseUrl = "https://karavanlibahce-cms.onrender.com/api";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { path: string[] } }) {
  const response = await fetch(`${cmsBaseUrl}/${params.path.join("/")}/`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "CMS unavailable" }, { status: response.status });
  }

  return NextResponse.json(await response.json(), {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
