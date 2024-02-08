import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// @desc    Get all users
// @api     GET /api/users/admin
// @access  Private/Admin
export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse(
        { message: "Token not provided", success: false },
        { status: 400 }
      );
    }

    const currUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!currUser) {
      return NextResponse(
        { message: "Invalid token", success: false },
        { status: 401 }
      );
    }

    const employees = await User.find({ _id: { $ne: currUser._id } });

    return NextResponse.json(
      {
        data: employees,
        message: "Get all employees except the current user",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}

// @desc    Create tasks for a user
// @api     POST /api/users/admin
// @access  Private/Admin
export async function POST(req) {
  return NextResponse.json({ message: "Create tasks for a user" });
}

// @desc    Assign a role to a user
// @api     PUT /api/users/admin
// @access  Private/Admin
export async function PUT(req) {
  return NextResponse.json({ message: "Assign a role to a user" });
}
