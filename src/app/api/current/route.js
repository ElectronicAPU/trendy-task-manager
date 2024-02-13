import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";
import { connectDB } from "@/helper/db";

export async function GET(req) {
  await connectDB();
  const userToken = await req.cookies.get("token")?.value;
  try {

    console.log(userToken);
    if (!userToken) {
      return NextResponse.json({
        message: "User not logged in",
        success: false,
      });
    }

    let user;
    try {
      user = jwt.verify(userToken, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.json({
        message: "Invalid token",
        success: false,
      });
    }

    const userDetails = await User.findById(user._id).select("-password");

    if (!userDetails) {
      return NextResponse.json({ message: "User not found" });
    }

    return NextResponse.json({ data: userDetails, success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
    });
  }
}
