import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient()

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };