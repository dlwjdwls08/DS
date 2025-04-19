import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { NextRequest } from "next/server";

const prisma = new PrismaClient()

dayjs.extend(utc)

export async function GET(req: NextRequest) {
    try {
        const now = dayjs.utc(new Date())
        const today = new Date(now.year(), now.month(), now.date())
        const new_now = now.add(1, 'day')
        const tomorrow = new Date(new_now.year(), new_now.month(), new_now.date())
        const progress = await prisma.$queryRaw`
            SELECT *
            FROM "Student" as S
            LEFT JOIN "AbsenceLog" as AL
            ON S."studentID" = AL."studentID" AND AL.date >= ${today} AND AL.date <= ${tomorrow}
            GROUP BY 
        `
    }
}