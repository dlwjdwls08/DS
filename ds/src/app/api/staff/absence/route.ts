import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const start = searchParams.get("start") //utc
        const end = searchParams.get("end") //utc
        console.log(start)
        console.log(end)
        if (!start || !end) {
            return NextResponse.json(
                { error: "Missing parameter" },
                { status: 500 }
            )
        }
        const now = dayjs(new Date())
        const absences = await prisma.$queryRaw`
        SELECT S.grade as grade, S."classNo" as classNo, S."studentID" as studentID, S.name as name, AL.date as date, AL.state as state, T.name as teacher
        FROM "Student" as S
        LEFT JOIN "AbsenceLog" as AL
        ON S."studentID" = AL."studentID" AND AL."date" >= ${new Date(start)} AND AL."date" <= ${new Date(end)}
        INNER JOIN "Teacher" as T
        ON S."classNo" = T."classNo" AND (S.grade = T.grade OR S."classNo" LIKE 'RAA%')
        LEFT JOIN "Leave" as L
        ON S."studentID" = L."studentID" AND AL.date >= L.date AND AL.date <= L.date + INTERVAL '1 DAY'
        LEFT JOIN "NightClass" as NC
        ON S."studentID" = NC."studentID" AND CASE EXTRACT(DOW FROM AL.date) WHEN 0 THEN '일' WHEN 1 THEN '월' WHEN 2 THEN '화' WHEN 3 THEN '수' WHEN 4 THEN '목' WHEN 5 THEN '금' WHEN 6 THEN '토' END = NC.day AND AL.date::time BETWEEN NC.start::time AND NC.end::time
        WHERE AL.state IS NULL
        `
        return NextResponse.json(
            { absenceData: absences},
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