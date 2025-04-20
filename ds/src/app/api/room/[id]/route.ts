import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// get Students in the room
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

        const students = await prisma.student.findMany({
            where: {
                room: room.name
            },
            orderBy: {
                studentID: 'asc'
            }
        })

        return NextResponse.json(
            {
                students: students,
                room: room
            }
        )
    }
    catch {
        return NextResponse.json({ error: "DB Error" }, { status: 500 })
    }
}