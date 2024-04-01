import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/nodemailer";
import User from "@/models/userModel";

import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, username } = reqBody;
    // console.log("reqBody ::", reqBody);
    // check if user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },{status:400}
      );
    }
    // console.log(user);
    //    hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    // console.log(hashPassword);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();
    // console.log("saveUser", saveUser);

    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json({
      message: "User Created successfully",
      success: true,
      data :saveUser,
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message},{status:500});
  }
}
