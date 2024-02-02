import { connectDB } from "@/helper/db";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

// @desc    Create a user
// @api     POST /api/users
// @access  Public
export async function POST(req) {
  try {
    const { name, email, password, gender, profileURL } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 400 }
      );
    } else {
      const newUser = new User({
        name,
        email,
        password,
        gender,
        profileURL,
      });

      newUser.password = await bcrypt.hash(
        newUser.password,
        parseInt(process.env.BCRYPT_SALT)
      );

      const createdUser = await newUser.save();

      return NextResponse.json({
        // data: createdUser,
        message: "User created successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}

// @desc    Get users
// @api     GET /api/users
// @access  Private
export async function GET(req) {
  const users = await User.find();

  return NextResponse.json(users);
}
