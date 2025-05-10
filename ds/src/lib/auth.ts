import NextAuth, { NextAuthOptions } from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const emailRegex = /\d{2}-\d{3}@ksa\.hs\.kr$/

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
    signIn: "/landing",
    error: "/landing"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        return '/landing' // 로그인 차단
      }

      const matcher = {
        "staff": /ksattendstaff\d*@gmail\.com/,
        "teacher": /ksattendteacher\d*@gmail\.com/,
        "student": /\d{2}-\d{3}@ksa\.hs\.kr/
      }
      for (const key of Object.keys(matcher)) {
        const regex = matcher[key as keyof typeof matcher]
        if (regex && regex.test(user.email)) {
          return true
        }
      }
      return '/landing'
    },
    async jwt({ token, account, profile }) {
      if (profile?.email) {
        token.email = profile.email;
        token.domain = profile.email.split("@")[1]; // 도메인 저장
        const matcher = {
          "staff": /ksattendstaff\d*@gmail\.com/,
          "teacher": /ksattendteacher\d*@gmail\.com/,
          "student": /\d{2}-\d{3}@ksa\.hs\.kr/
        }
        for (const key of Object.keys(matcher)) {
          if (matcher[key as keyof typeof matcher].test(token.email)) {
            token.role = key
          }
        }
      }
      return token;
    }
  }
}