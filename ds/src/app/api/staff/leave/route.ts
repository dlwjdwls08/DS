import { Leave, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const data = []
        for (const row of body) {
            const date = dayjs(row.date).tz('Asia/Seoul')
            data.push({
                studentID: row.studentID,
                studentName: row.studentName,
                date: new Date(date.year(), date.month(), date.date())
            })
        }
        await prisma.leave.createMany({
            data: data
        })
        return NextResponse.json(
            {}
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