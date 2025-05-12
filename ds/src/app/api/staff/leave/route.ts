import { Leave, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const today = dayjs().tz('Asia/Seoul')
        const body = await req.json()
        const data = []
        for (const row of body) {
            data.push({
                studentID: row.studentID,
                studentName: row.studentName,
                date: new Date(today.year(), today.month(), today.date())
            })
        }
        await prisma.leave.createMany({
            data: data
        })
        return NextResponse.json(
            {}
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