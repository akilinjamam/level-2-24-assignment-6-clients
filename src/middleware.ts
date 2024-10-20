import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/authService";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  interface IUser {
    email: string;
    role: "admin" | "user";
  }

  const user = getCurrentUser() as IUser | null;

  if (!user || !user.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const url = request.nextUrl.pathname;

  if (user?.role === "admin") {
    if (url.startsWith("/userDashboard")) {
      return NextResponse.redirect(new URL("/adminDashboard", request.url));
    }
  }

  if (user?.role === "user") {
    // Users should not access the admin dashboard
    if (url.startsWith("/adminDashboard")) {
      return NextResponse.redirect(new URL("/userDashboard", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/profile/:page*", "/userDashboard", "/adminDashboard"],
};
