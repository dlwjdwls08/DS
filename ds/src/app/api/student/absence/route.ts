import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const studentID = session?.user?.email?.slice(0, 6)
        const today = dayjs().tz('Asia/Seoul')
        const date = new Date(today.year(), today.month(), today.date())
        const absences = await prisma.absenceLog.findMany({
            select: {
                date: true
            },
            where: {
                studentID: {
                    equals: studentID
                },
                state: {
                    not: true
                },
                date: {
                    lt: date
                }
            }
        })
        return NextResponse.json(
            { absenceData: absences }
        )
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}