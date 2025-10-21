import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get("host") || "";

  // 1️⃣ Account subdomain
  if (host.startsWith("account.")) {
    // For example: account.localhost:3000 -> route to /auth
    url.pathname = `/auth${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // 2️⃣ Default (me.)
  if (host.startsWith("me.") || host.startsWith("localhost")) {
    // stays in marketing area
    return NextResponse.next();
  }

  return NextResponse.next();
}
