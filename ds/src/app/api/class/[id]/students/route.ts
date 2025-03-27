import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// get Students of the Class
export async function GET(req:NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params
    const students = await prisma.student.findMany({
        where: {
            classID: Number(id)
        },
        orderBy: {
            studentID: 'asc'
        }
    })
    return NextResponse.json(students)
}