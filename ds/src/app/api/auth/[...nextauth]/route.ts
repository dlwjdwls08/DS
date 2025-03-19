import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const emailRegex = /\d{2}-\d{3}@ksa.hs.kr/;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !emailRegex.test(user.email!)) {
        return false; // 로그인 차단
      }
      return true; // 로그인 허용
    },
    async session({ session }) {
      if (!session.user?.email || !emailRegex.test(session.user.email)) {
        return {
          ...session,
          user: {
            name: null,
            email: null,
            image: null
          }
        };
      }
      return session;
    },
  },
  pages: {
    error: "/auth/error",
  }
});

export { handler as GET, handler as POST };