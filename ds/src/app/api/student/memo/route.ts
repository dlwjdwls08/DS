import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const studentID = session?.user?.email?.slice(0, 6)
        const memos = await prisma.memo.findMany({
            select: {
                content: true,
                time: true
            },
            where: {
                studentID: {
                    equals: studentID
                }
            }
        })
        return NextResponse.json(
            { memoData: memos }
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}