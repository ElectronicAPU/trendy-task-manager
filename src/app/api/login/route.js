import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    
  } catch (error) {
    
  }

  return NextResponse.json(user);
}
