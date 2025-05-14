import { PrismaClient } from "@prisma/client";
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
        const today = dayjs().tz('Asia/Seoul')
        const date = new Date(today.year(), today.month(), today.date())
        await prisma.teacherName.upsert({
            where: {
                date: date
            },
            create: {
                name: String(body.name),
                date: date
            },
            update: {
                name: String(body.name)
            }
        })
        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}