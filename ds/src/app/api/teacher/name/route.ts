import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const today = dayjs().tz('Asia/Seoul').startOf('day')
        const date = new Date(today.toISOString())
        await prisma.teacherName.upsert({
            where: {
                date: date
            },
            create: {
                name: String(body.name),
                date: date
            },
            update: {
                name: String(body.name)
            }
        })
        return NextResponse.json({})
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}

export async function GET(req: NextRequest) {
    try {
        const today = dayjs().tz('Asia/Seoul').startOf('day')
        const date = new Date(today.toISOString())
        const teacherName = await prisma.teacherName.findUnique({
            where: { date: date }
        })
        if (!teacherName) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 })
        }
        return NextResponse.json({ name: teacherName.name })
    }
    catch (e) {
        console.error(e)
        return NextResponse.json({ error: "DB Error" }, { status: 500 })
    }
}