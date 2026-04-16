import { NextResponse } from "next/server";

// Routes that require the user to be authenticated
const PROTECTED_PREFIXES = ["/MyVn"];

// Routes that authenticated users should not see (auth pages)
const AUTH_ONLY_ROUTES = ["/login"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Better Auth stores the session in this cookie
  const sessionToken = request.cookies.get("better-auth.session_token");
  const isAuthenticated = !!sessionToken?.value;

  // Block unauthenticated access to protected routes
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect already-authenticated users away from the login page
  if (AUTH_ONLY_ROUTES.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/MyVn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run proxy on these paths only — skip static files and API routes
  matcher: ["/MyVn/:path*", "/login"],
};
