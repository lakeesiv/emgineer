import { NextResponse } from "next/server";
import { getServerAuthSession } from "server/auth";

export async function GET(request: Request) {
  const session = await getServerAuthSession();

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
