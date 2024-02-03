import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("token not found");
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin", "/signup"],
};
