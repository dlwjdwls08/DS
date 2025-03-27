import { Prisma, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// get List of StudentIDs taking offical Leave & night class at the time.
export async function GET(request: Request, {params}:{params:{date:string}}) {
    const { date } = params;
    const curTime = new Date(date);
    const marginTime = 10 * 60 * 1000; 
    const leaves = await prisma.leaveList.findMany({
        where: {
            AND: [
                { start: { lte: new Date(curTime.getTime() + marginTime) } },
                { end: { gte: new Date(curTime.getTime() - marginTime) } }
            ]
        },
        orderBy: {
            studentID: 'asc'
        }
    });


    const classes = await prisma.nightClass.findMany({
        where: {
            AND: [
                { day:  curTime.getDay() },
                
                // 19:30 ~ 20:30 -> 10
                // 20:30 ~ 21:30 -> 11
                { time: new Date(curTime.getTime() - 9.5 * 60 * 60 * 1000).getHours() },
                
            ]
        },
        orderBy: {
            studentID: 'asc'
        }
    });

    const leaveIDList = leaves.map((item) => item.studentID);
    const classIDList = classes.map((item) => item.studentID);
    const unionIDs = Array.from(new Set([...leaveIDList, ...classIDList]));


    return NextResponse.json(unionIDs);
}

export async function POST(request: Request) {
    // Handle POST request logic here
    const body = await request.json();
    return NextResponse.json({ message: 'POST request received', data: body });
}
