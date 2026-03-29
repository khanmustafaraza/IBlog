import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/token";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          msg: "Not authenticated",
        },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        msg: "Invalid token",
      },
      { status: 401 },
    );
  }
}
