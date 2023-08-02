import { NextResponse } from "next/server";

export async function GET(request: Request) {
  NextResponse.json({ message: "Hello from the API!" });
}
