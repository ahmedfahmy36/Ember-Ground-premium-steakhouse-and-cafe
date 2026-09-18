import { NextResponse } from "next/server";
import menuData from "@/content/menu.json";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(menuData, {
    status: 200,
    headers: {
      // Cache at the CDN for 60 s, but always revalidate — mirrors a real CMS
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
