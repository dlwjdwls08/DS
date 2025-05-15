import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { NextResponse } from "next/server";

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient();


export async function GET(request: Request) {
    
    const today = dayjs().tz('Asia/Seoul').startOf('day')
    const date = new Date(today.toISOString())
    const nextDate = new Date(today.add(1, 'day').toISOString())
            
    const memos = await prisma.memo.findMany({
        distinct: ['studentID'],
        select: {
            studentID: true,
            student: { select: { name: true, room: true } },
            content: true
        },
        where: {
            time: {
                gte: date,
                lt: nextDate
            },
            read: {
                equals: false
            }
        },
        orderBy: {
            time: 'desc'
        }
    })
    
    return NextResponse.json(
        { memoData: memos }
    )
}
