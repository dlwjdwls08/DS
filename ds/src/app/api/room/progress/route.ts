import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

dayjs.extend(utc)

export async function GET(req: NextRequest) {
    try {
        const now = dayjs.utc(new Date())
        const today = new Date(now.year(), now.month(), now.date())
        const new_now = now.add(1, 'day')
        const tomorrow = new Date(new_now.year(), new_now.month(), new_now.date())
        console.log(today)
        const progress = await prisma.$queryRaw<{
            name: string,
            active_count: bigint,
            total_count: bigint
        }[]>`
            SELECT
            R."name" as name,
            COUNT(CASE WHEN AL.state IS NOT NULL THEN 1 END) as active_count,
            COUNT(*) as total_count
            FROM "Room" as R
            INNER JOIN "Student" as S
            ON R."name" = S."room"
            LEFT JOIN "AbsenceLog" as AL
            ON S."studentID" = AL."studentID" AND AL.date >= ${today} AND AL.date <= ${tomorrow}
            GROUP BY R."name"
        `
        const progressData = progress.map((item) => ({
            name: item.name,
            active_count: Number(item.active_count),
            total_count: Number(item.total_count)
        }))
        console.log(`progressData : ${progressData}`)
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