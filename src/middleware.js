import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/token";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  console.log("MIDDLEWARE RUNNING");
  console.log("PATHNAME:", pathname);
  console.log("TOKEN:", token);

  // ---------------- PUBLIC ROUTES ----------------
  const publicRoutes = ["/login", "/register", "/"];

  // If user is not logged in
  if (!token) {
    // protect admin and user routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  try {
    const decoded = verifyToken(token);

    // If already logged in and trying to visit login/register
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(
        new URL(
          decoded.isAdmin ? "/admin/dashboard" : "/user/dashboard",
          request.url,
        ),
      );
    }

    // ---------------- ADMIN PROTECTION ----------------
    if (pathname.startsWith("/admin")) {
      if (!decoded.isAdmin) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // ---------------- USER PROTECTION ----------------
    if (pathname.startsWith("/user")) {
      if (!decoded.id) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/login", "/register"],
};
