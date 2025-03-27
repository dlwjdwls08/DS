import { Prisma, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// get List of Students taking offical Leave & night class at the time.
export async function GET(request: Request, {params}:{params:{date:string}}) {
    const { date } = params;
    const curTime = new Date(date);
    const marginTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    const leaves = await prisma.leaveList.findMany({
        where: {
            AND: [
                { start: { lte: new Date(curTime.getTime() + marginTime) } },
                { end: { gte: new Date(curTime.getTime() - marginTime) } }
            ]
        },
        orderBy: {
            id: 'asc'
        }
    });

    
    // TODO: 수업시간에 맞춰서 nightClass를 가져오는 로직 추가
    const classes = await prisma.nightClass.findMany({
        where: {
            AND: [
                { day: curTime.getDay() },
                // { time: { lte: new Date(curTime.getTime() + marginTime) } },
            ]
        },
        orderBy: {
            id: 'asc'
        }
    });


    return NextResponse.json({ message: 'GET request received' });
}

export async function POST(request: Request) {
    // Handle POST request logic here
    const body = await request.json();
    return NextResponse.json({ message: 'POST request received', data: body });
}
