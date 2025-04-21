import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";

const prisma = new PrismaClient()

// get Students in the room
// export async function GET(req:NextRequest, {params}: { params: Promise<{ id: string }> }) {
//     try {
        
//         const { id } = await params
//         const room = await prisma.room.findUnique({ 
//             where: {
//                 id: Number(id)
//             },
//         })
//         if (!room) {
//             return NextResponse.json({ error: "Room not found" }, { status: 404 })
//         }

//         const students = await prisma.student.findMany({
//             where: {
//                 room: room.name
//             },
//             orderBy: {
//                 studentID: 'asc'
//             }
//         })

//         return NextResponse.json(
//             {
//                 students: students,
//                 room: room
//             }
//         )
//     }
//     catch {
//         return NextResponse.json({ error: "DB Error" }, { status: 500 })
//     }
// }


// get Students + Data in the room
export async function GET(req:NextRequest, {params}: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params
        const room = await prisma.room.findUnique({ 
            where: {
                id: Number(id)
            },
        })
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 })
        }

        const now = new Date()
        const today = dayjs(now)


        const students = await prisma.student.findMany({
            where: {
                room: room.name
            },
            orderBy: {
                studentID: 'asc'
            }
        })

        const studentIDList = []
        for (const student of students) {
            studentIDList.push(student.studentID)
        }

        const memos = await prisma.memo.findMany({
            select: {
                content: true,
                time: true,
                studentID: true
            },
            where: { 
                studentID: {
                    in: studentIDList
                }
            }
        })

        const leaves = await prisma.leave.findMany({
            select: {
                studentID: true,
                studentName: true,
            },
            where: {
                studentID: {
                    in: studentIDList
                },
                date: {
                    equals: new Date(today.year(), today.month(), today.date())
                }
            }
        })

        const nightClasses = await prisma.nightClass.findMany({
            select: {
                studentID: true,
                className: true,
                studentName: true,
                start: true,
                end: true
            }
        })

        return NextResponse.json(
            {
                room: room,
                students: students,
                memos: memos,
                leaves: leaves,
                nightClasses: nightClasses
            }
        )
    }
    catch {
        return NextResponse.json({ error: "DB Error" }, { status: 500 })
    }
}