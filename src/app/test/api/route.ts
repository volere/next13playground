import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const req = request.json();
  console.log(req);
  return NextResponse.json(request, { status: 200 });
}
