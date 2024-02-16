import testUsers from "@/array/testUsers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = await req.nextUrl.searchParams.get("search");

  // Filter testUsers based on the search query
  const filteredUsers = testUsers.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchParams.toLowerCase())
    )
  );

  return NextResponse.json(filteredUsers);
}
