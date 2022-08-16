import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  if (!request.url.includes("/api")) {
    if (
      !request.url.includes("/enter") &&
      // @ts-ignore
      !request.cookies.get("likelionsession")
    ) {
      return NextResponse.redirect(
        new URL("/enter", request.url)
      );
    }
  }
}
