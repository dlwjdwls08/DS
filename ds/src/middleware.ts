import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    
  },
  {
    pages: {
      signIn: "/landing",
      error: "/landing"
    }
  }
)

export const config = {
  matcher: [
    "/((?!landing|api).*)",
  ],
}