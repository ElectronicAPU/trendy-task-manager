import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ message: "Logout", success: true });

  response.cookies.set("token", "", {
    expires: new Date(0),
  });

  return response;
}
