import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const start_param = searchParams.get("start")
        const end_param = searchParams.get("end")
        if (!start_param || !end_param) {
            return NextResponse.json(
                { error: "Missing parameter" },
                { status: 500 }
            )
        }
        const start_date = new Date(start_param)
        const end_date = new Date(end_param)
        const absences:{attend: bigint, absence: bigint, penalty: bigint, date: string}[] = await prisma.$queryRaw`
        SELECT
        AL.date AS "date",
        COUNT(*) FILTER (
            WHERE AL.state = true
        ) AS attend,
        
        COUNT(*) FILTER (
            WHERE AL.state = false
        ) AS absence,
        
        COUNT(*) FILTER (
            WHERE AL.state = false
            AND (
                SELECT COUNT(*)
                FROM "AbsenceLog" prev
                WHERE prev."studentID" = AL."studentID"
                AND prev."date" <= AL."date" AND prev."date" >= ${start_date}
                AND prev.state = false
            ) % 3 = 0
        ) AS penalty

        FROM "AbsenceLog" AL
        WHERE AL."date" >= ${start_date} AND AL."date" <= ${end_date}
        GROUP BY AL."date"
        ORDER BY AL."date"
        `
        return NextResponse.json(
            absences.map((v) => {return {attend: Number(v.attend), absence: Number(v.absence), penalty: Number(v.penalty), date: v.date}}),
            { status: 200 }
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