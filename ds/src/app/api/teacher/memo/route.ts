import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { NextResponse } from "next/server";

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient();


export async function GET(request: Request) {
    
    const today = dayjs().tz('Asia/Seoul')
    const date = new Date(today.year(), today.month(), today.date())
    const nextDate = new Date(today.year(), today.month(), today.date() + 1)
            
    const memos = await prisma.memo.findMany({
        select: {
            studentID: true,
            student: { select: { name: true, room: true } },
            content: true
        },
        where: {
            time: {
                gte: date,
                lt: nextDate
            }
        },
        orderBy:{
            time: 'desc'
        }
    })
    
    console.log("memos")
    console.log(memos)
    return NextResponse.json(
        { memoData: memos }
    )
}