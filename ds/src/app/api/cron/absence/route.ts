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
    const init = await prisma.absenceLog.findFirst({
        where: {
            date: {
                equals: new Date(today.year(), today.month(), today.date())
            }
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
    await prisma.absenceLog.deleteMany({
        where: {
            date: {
                equals: new Date(today.year(), today.month(), today.date())
            }
        }
    })
    await prisma.absenceLog.createMany({
        data: students.map((v) => {
            return {
                studentID: v.studentID,
                date: new Date(today.year(), today.month(), today.date()),
                state: false
            }
        })
    })

    return NextResponse.json({ message: "Initialized" })
}