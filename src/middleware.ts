import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("r_token")?.value;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtected = pathname.startsWith("/dashboard");

  if (isAuthPage && token) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  if (isProtected && !token) {
    const url = new URL("/login", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
