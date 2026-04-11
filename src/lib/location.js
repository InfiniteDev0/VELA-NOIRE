import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const country = req.cookies.get("country");

  if (!country) return NextResponse.next();

  const c = JSON.parse(country.value);
  if (!url.searchParams.get("dispatchCountry")) {
    url.searchParams.set("dispatchCountry", c.code);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
