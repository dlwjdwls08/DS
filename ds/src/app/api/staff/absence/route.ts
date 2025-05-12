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
        const start = dayjs(start_param)
        const end = dayjs(end_param)
        const start_date = new Date(start.year(), start.month(), start.date())
        const end_date = new Date(end.year(), end.month(), end.date())
        console.log(start_date)
        console.log(end_date)
        const absences = await prisma.$queryRaw`
        SELECT S.grade as grade, S."classNo" as classNo, S."studentID" as studentID, S.name as name, AL.date as date, AL.state as state, T.name as teacher, NC.day
        -- SELECT *
        FROM "Student" as S
        LEFT JOIN "AbsenceLog" as AL
        ON S."studentID" = AL."studentID" AND AL."date" >= ${start_date} AND AL."date" <= ${end_date}
        INNER JOIN "Teacher" as T
        ON S."classNo" = T."classNo" AND (S.grade = T.grade OR S."classNo" LIKE 'RAA%')
        LEFT JOIN "Leave" as L
        ON S."studentID" = L."studentID" AND AL.date = L.date
        LEFT JOIN "NightClass" as NC
        ON S."studentID" = NC."studentID" AND NC.day + 1 = TO_CHAR(AL.date, 'D')
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