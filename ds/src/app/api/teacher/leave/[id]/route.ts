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

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const { id } = await params
        const today = dayjs().tz('Asia/Seoul')
        const nightClass = await prisma.nightClass.findFirst({
            select: {
                className: true,
            },
            where: {
                studentID: {
                    equals: id
                },
                day: {
                    equals: today.day()
                }
            }
        })
        const date = new Date(today.startOf('day').toISOString())
        const leave = await prisma.leave.findMany({
            where: {
                studentID: {
                    equals: id
                },
                date: {
                    equals: date
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