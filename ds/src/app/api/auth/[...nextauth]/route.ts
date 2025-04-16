import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const emailRegex = /\d{2}-\d{3}@ksa\.hs\.kr$/;

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/auth",
        params: {
          prompt: "select_account", // 항상 계정 선택 화면을 띄움
          access_type: "offline",
          response_type: "code",
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: "/landing"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email || !emailRegex.test(user.email!)) {
        return false; // 로그인 차단
      }

      return true
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };