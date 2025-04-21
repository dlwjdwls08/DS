import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const { id } = await params
        const now = new Date()
        const nowKR = new Date(now.toLocaleString('en-US', {
            timeZone: "Asia/Seoul"
        }))
        const time = new Date(Date.UTC(1970, 0, 1, now.getUTCHours(), now.getUTCMinutes()))
        const day = "일월화수목금토"[nowKR.getDay()]
        const nightClass = await prisma.nightClass.findFirst({
            select: {
                className: true,
                start: true,
                end: true
            },
            where: {
                studentID: {
                    equals: id
                },
                start: {
                    lte: time
                },
                end: {
                    gte: time
                },
                day: {
                    equals: day
                }
            }
        })
        const leave = await prisma.leave.findMany({
            select: {
                reason: true,
                start: true,
                end: true
            },
            where: {
                studentID: {
                    equals: id
                },
                start: {
                    lte: now
                },
                end: {
                    gte: now
                }
            }
        })
        return NextResponse.json(
            { classData: nightClass, leaveData: leave }
        )
    }
  catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}