import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    //1. Find User by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    //2. Match DB password against user.password
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      throw new Error("Wrong password");
    }

    //3. Create a JWT token for the user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //4. Set the token into the cookie
    const response = NextResponse.json(
      {
        data: user,
        message: "Login Successfull",
        success: true,
      },
      { status: 200 }
    );

    const oneDay = 24 * 60 * 60 * 1000;
    response.cookies.set("token", token, {
      expires: Date.now() - oneDay,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    let status = 500;

    if (error.message === "User not found") {
      status = 404;
    } else if (error.message === "Wrong password") {
      status = 400;
    }

    return NextResponse.json(
      { message: error.message, success: false },
      { status }
    );
  }
}
