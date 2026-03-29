import Register from "@/models/Register";
import connectDB from "@/utils/db";
import { hashPassword } from "@/utils/password";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await Register.findOne({ email: normalizedEmail });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password too short" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const newUser = new Register({
      name,
      email: normalizedEmail,
      password: hashed,
    });

    await newUser.save();

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
};