import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!token || !token.email) {
      return NextResponse.redirect(new URL("/landing", req.url))
    }
    const matcher = {
      "/staff": /ksattendstaff\d*@gmail\.com/,
      "/teacher": /ksattendteacher\d*@gmail\.com/,
      "/student": /\d{2}-\d{3}@ksa\.hs\.kr/,
    }

    const start = "/" + req.nextUrl.pathname.split('/')[1]
    const regex = matcher[start as keyof typeof matcher]
    if (regex && regex.test(token.email)) {
      return NextResponse.next()
    }
    else if (regex || start === "/") {
      for (const key of Object.keys(matcher)) {
        if (matcher[key as keyof typeof matcher].test(token.email)) {
          return NextResponse.redirect(new URL(key, req.url))
        }
      }
    }
    
    return NextResponse.next()
  },
  {
    pages: {
      error: "/landing"
    }
  }
)

export const config = {
  matcher: [
    "/",
    "/staff",
    "/staff/:path*",
    "/teacher",
    "/teacher/:path*",
    "/student",
    "/student/:path*"
  ],
}