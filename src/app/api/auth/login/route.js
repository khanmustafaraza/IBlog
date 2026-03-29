import Register from "@/models/Register";
import connectDB from "@/utils/db";
import { checkPassword } from "@/utils/password";
import { generateToken } from "@/utils/token";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  const existAccount = await Register.findOne({ email });

  if (!existAccount) {
    return NextResponse.json({
      statusCode: 400,
      success: false,
      msg: "Account does not exist!",
    });
  }

  const isPasswordValid = await checkPassword(password, existAccount.password);

  if (!isPasswordValid) {
    return NextResponse.json({
      statusCode: 400,
      success: false,
      msg: "Invalid email or password",
    });
  }

  const token = generateToken(existAccount);
  //   user: {
  //     id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //   },
  const user = {
    _id: existAccount._id,
    token: token,
    email: existAccount.email,
    name: existAccount.name,
    isAdmin:existAccount.isAdmin
  };

  return NextResponse.json({
    statusCode: 200,
    success: true,
    msg: "Login Successfully",   
    user: user,
  });
}
