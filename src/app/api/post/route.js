import Post from "@/models/Post";
import connectDB from "@/utils/db"; // fixed typo
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectDB(); // connect to MongoDB
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
};

export const POST = async (request) => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();

    // 2️⃣ Parse request body
    const data = await request.json();

    // 3️⃣ Create new Post instance
    const newPost = new Post(data);

    // 4️⃣ Save to DB
    const savedPost = await newPost.save();

    // 5️⃣ Return success response
    return NextResponse.json(
      { success: true, post: savedPost },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
};
