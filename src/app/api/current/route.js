import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";
import { connectDB } from "@/helper/db";

export async function GET(req) {
  const userToken = await req.cookies.get("token")?.value;

  await connectDB();

  if (!userToken) {
    return NextResponse.json({ message: "User not logged in", success: false });
  }

  try {
    const user = jwt.verify(userToken, process.env.JWT_SECRET);

    const userDetails = await User.findById(user._id).select("-password");

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" });
    }

    return NextResponse.json({ data: userDetails, success: true });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Token is malformed or invalid
      return NextResponse.json({ message: "Invalid token", success: false });
    } else if (error.name === "TokenExpiredError") {
      // Token has expired
      return NextResponse.json({
        message: "Token has expired",
        success: false,
      });
    } else {
      // Other errors
      return NextResponse.json({
        message: "Internal server error",
        success: false,
      });
    }
  }
}
