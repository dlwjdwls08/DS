import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const today = dayjs().tz('Asia/Seoul')
    const date = new Date(today.year(), today.month(), today.date())
    console.log(date)
    const init = await prisma.absenceLog.findFirst({
        where: {
            date: date
        }
    })
    if (init) {
        return NextResponse.json({ message: "Denied" }, { status: 401 })
    }
    const students = await prisma.student.findMany({
        orderBy: {
            studentID: "asc"
        }
    })
    await prisma.absenceLog.createMany({
        data: students.map((v) => {
            return {
                studentID: v.studentID,
                date: date,
                state: false
            }
        })
    })

    return NextResponse.json({ message: "Initialized" })
}