import { data } from "@/data/product";
import { Product } from "../../../../../types/product";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  //console.log("rawquest", request);
  const body = await request.json();
  console.log(body);
  const headersList = headers();
  console.log("Headers", headersList);

  const id = searchParams.get("id");
  console.log("BODY", body);
  // return NextResponse.json({ item }, { status: 200 });
}
