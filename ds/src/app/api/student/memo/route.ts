import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

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
            },
            orderBy: {
                time: "desc"
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

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const session = await getServerSession(authOptions)
        const studentID = session?.user?.email?.slice(0, 6)
        const now = dayjs().tz('Asia/Seoul')
        const memo = await prisma.memo.create({
            data: {
                studentID: studentID!,
                content: body.content,
                time: new Date(now.toISOString())
            }
        })
        return NextResponse.json(
            { memo: memo }
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}