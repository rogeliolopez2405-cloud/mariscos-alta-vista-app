import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAuthed = request.cookies.get("dashboard_auth")?.value === "1";

  if (!isAuthed) {
    const loginUrl = new URL("/dashboard/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
