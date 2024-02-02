import { connectDB } from "@/helper/db";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

connectDB();

// @desc    Create a user
// @api     POST /api/users
// @access  Public
export async function POST(req) {
  try {
    const { name, email, password, gender, profileURL } = await req.json();

    const newUser = new User({
      name,
      email,
      password,
      gender,
      profileURL,
    });

    const createdUser = await newUser.save();

    return NextResponse.json({
      // data: createdUser,
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
}
