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
        const absences = await prisma.$queryRaw`
        SELECT S.grade as grade, S."classNo" as classNo, S."studentID" as studentID, S.name as name, AL.date as date, AL.state as state, T.name as teacher, NC.day
        -- SELECT *
        FROM "AbsenceLog" as AL
        INNER JOIN "Student" as S
        ON S."studentID" = AL."studentID" AND AL."date" >= ${start_date} AND AL."date" <= ${end_date}
        INNER JOIN "Teacher" as T
        ON S."classNo" = T."classNo" AND (S.grade = T.grade OR S."classNo" LIKE 'RAA%')
        LEFT JOIN "Leave" as L
        ON S."studentID" = L."studentID" AND AL.date = L.date
        LEFT JOIN "NightClass" as NC
        ON S."studentID" = NC."studentID" AND NC.day = EXTRACT(DOW FROM AL.date)
        WHERE AL.state = false AND L.id IS NULL AND NC.id IS NULL
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