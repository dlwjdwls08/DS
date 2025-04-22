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
        SELECT S.grade as grade, S."classNo" as classNo, S."studentID" as studentID, S.name as name, AL.date as date, AL.state as state, T.name as teacher, NC.day
        -- SELECT *
        FROM "Student" as S
        LEFT JOIN "AbsenceLog" as AL
        ON S."studentID" = AL."studentID" AND AL."date" >= ${new Date(start)} AND AL."date" <= ${new Date(end)}
        INNER JOIN "Teacher" as T
        ON S."classNo" = T."classNo" AND (S.grade = T.grade OR S."classNo" LIKE 'RAA%')
        LEFT JOIN "Leave" as L
        ON S."studentID" = L."studentID" AND ${new Date(start)} >= L.date AND ${new Date(start)} <= L.date + INTERVAL '1 DAY'
        LEFT JOIN "NightClass" as NC
        ON S."studentID" = NC."studentID" AND NC.day = ${"일월화수목금토"[new Date(new Date(start).getTime() + 9 * 60 * 60 * 1000).getDay()]}
        WHERE AL.state IS NULL AND L.id IS NULL AND NC.id IS NULL
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