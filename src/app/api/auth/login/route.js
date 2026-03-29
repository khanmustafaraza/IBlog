import Register from "@/models/Register";
import connectDB from "@/utils/db";
import { checkPassword } from "@/utils/password";
import { generateToken } from "@/utils/token";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const existAccount = await Register.findOne({ email });

    if (!existAccount) {
      return NextResponse.json(
        {
          success: false,
          msg: "Account does not exist!",
        },
        { status: 400 },
      );
    }

    const isPasswordValid = await checkPassword(
      password,
      existAccount.password,
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          msg: "Invalid email or password",
        },
        { status: 400 },
      );
    }

    const token = generateToken(existAccount);

    const response = NextResponse.json(
      {
        success: true,
        msg: "Login Successfully",
        user: {
          _id: existAccount._id,
          email: existAccount.email,
          name: existAccount.name,
          isAdmin: existAccount.isAdmin,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Something went wrong",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
