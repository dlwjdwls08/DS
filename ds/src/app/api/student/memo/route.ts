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
        console.log(body)
        const session = await getServerSession(authOptions)
        const studentID = session?.user?.email?.slice(0, 6)
        const memo = await prisma.memo.create({
            data: {
                studentID: studentID!,
                content: body.content,
                time: new Date()
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