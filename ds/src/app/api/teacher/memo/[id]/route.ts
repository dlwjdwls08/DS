import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const { id } = await params
    
        const today = dayjs().tz('Asia/Seoul')
        const date = new Date(today.year(), today.month(), today.date())
        const nextDate = new Date(today.year(), today.month(), today.date() + 1)
        
        const memos = await prisma.memo.findMany({
            select: {
                content: true,
                time: true,
            },
            where: {
                studentID: {
                    equals: id
                },
                time: {
                    gte: date,
                    lt: nextDate
                }
            },
            orderBy: {
                time: "desc"
            },
        })

        await prisma.memo.updateMany({
            where: {
                studentID: {
                    equals: id
                },
                time: {
                    gte: date,
                    lt: nextDate
                }
            },
            data: {
                read: true
            }
        })

        
        return NextResponse.json(
            { memoData: memos }
        )
    }
    
    catch(e) {
        console.error(e)
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}