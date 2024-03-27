import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User Not with this email exists" },
        { status: 400 }
      );
    }
    console.log(user);

    // compare password with db password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    console.log("password",isPasswordCorrect);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "enter correct password" },
        { status: 400 }
      );
    }
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token =  jwt.sign(payload, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "User Logedin successfully",
      success: true,
    });

    response.cookies.set("Token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
