import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const start = searchParams.get("start") //utc
        const end = searchParams.get("end") //utc
        const range = searchParams.get("range")
        if (!start || !end || !range) {
            return NextResponse.json(
                { error: "Missing parameter" },
                { status: 500 }
            )
        }
        if (range == "true") {
            const absences = await prisma.$queryRaw`
            SELECT *
            FROM "Student" as S
            INNER JOIN "AbsenceLog" as AL
            ON S."studentID" = AL."studentID"
            WHERE AL.date >= ${new Date(start)} AND AL.date <= ${new Date(end)} AND AL.state = false`
            return NextResponse.json(
                { absenceData: absences, range: true},
                { status: 200 }
            )
        }
        else {
            console.log(start)
            console.log(end)
            const absences = await prisma.$queryRaw`
            SELECT S.grade as grade, S."classNo" as classNo, S."studentID" as studentID, S.name as name, AL.date as date, AL.state as state, T.name as teacher
            FROM "Student" as S
            LEFT JOIN "AbsenceLog" as AL
            ON S."studentID" = AL."studentID" AND AL."date" >= ${new Date(start)} AND AL."date" <= ${new Date(end)}
            INNER JOIN "Teacher" as T
            ON S."classNo" = T."classNo" AND (S.grade = T.grade OR S."classNo" LIKE 'RAA%')
            WHERE AL.state IS NOT true
            `
            return NextResponse.json(
                { absenceData: absences, range: false},
                { status: 200 }
            )
        }
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}