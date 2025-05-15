import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

dayjs.extend(utc)
dayjs.extend(timezone)

export async function GET(req: NextRequest) {
    try {
        const today = dayjs().tz('Asia/Seoul').startOf('day')
        const today_date = new Date(today.toISOString())
        const progress = await prisma.$queryRaw<{
            name: string,
            active_count: bigint,
            total_count: bigint
        }[]>`
            SELECT
            R."name" as name,
            COUNT(CASE WHEN AL.state = true THEN 1 END) as active_count,
            COUNT(*) as total_count
            FROM "Room" as R
            INNER JOIN "Student" as S
            ON R."name" = S."room"
            LEFT JOIN "AbsenceLog" as AL
            ON S."studentID" = AL."studentID" AND AL.date = ${today_date}
            GROUP BY R."name"
        `
        const progressData = progress.map((item) => ({
            name: item.name,
            active_count: Number(item.active_count),
            total_count: Number(item.total_count)
        }))
        // console.log(`progressData : ${progressData}`)
        return NextResponse.json(
            { progressData: progressData }
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