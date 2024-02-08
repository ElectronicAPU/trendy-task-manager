import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export default async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (token) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin", "/signup"],
};
