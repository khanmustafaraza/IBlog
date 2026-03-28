import mongoose from "mongoose";

const MONGO = process.env.MONGO;

if (!MONGO) {
  throw new Error("Please define MONGO_URI in .env.local");
}

export default async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO);
    console.log("MongoDB connected:", conn.connection.host);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // re-throw so Next.js knows something went wrong
  }
}