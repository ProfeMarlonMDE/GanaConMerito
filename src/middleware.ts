import { NextResponse, type NextRequest } from "next/server";

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/dashboard/:path*",
    "/practice/:path*",
    "/exam/:path*",
    "/history/:path*",
    "/login",
  ],
};
