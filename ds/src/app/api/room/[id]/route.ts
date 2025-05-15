import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

dayjs.extend(utc)
dayjs.extend(timezone)

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

        const today = dayjs().tz('Asia/Seoul').startOf('day')
        const date = new Date(today.toISOString())


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
                date: date
            }
        })

        const nightClasses = await prisma.nightClass.findMany({
            select: {
                studentID: true,
                className: true,
                studentName: true,
            },
            where: {
                studentID: {
                    in: studentIDList
                },
                day: today.day()
            }
        })

        const absences = await prisma.absenceLog.findMany({
            select: {
                studentID: true,
                state: true,
            },
            where: {
                studentID: {
                    in: studentIDList
                },
                date: date
            }
        })

        // console.log("API OUTPUT")
        // console.log({
        //     room: room,
        //     students: students,
        //     memos: memos,
        //     leaves: leaves,
        //     nightClasses: nightClasses,
        //     absences: absences
        // })

        return NextResponse.json(
            {
                room: room,
                students: students,
                memos: memos,
                leaves: leaves,
                nightClasses: nightClasses,
                absences: absences
            }
        )
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ error: "DB Error" }, { status: 500 })
    }
}