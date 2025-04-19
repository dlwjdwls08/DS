import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const rooms = await prisma.room.findMany({
            select: {
                grade: true,
                type: true,
                name: true
            }
        })
        return NextResponse.json(
            { roomData: rooms },
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 200 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Room" RESTART IDENTITY CASCADE`);
        await prisma.room.createMany({
            data: body
        })
        return NextResponse.json(
            {}
        )
    }
    catch {
        return NextResponse.json(
            { error: "Error" },
            { status: 500 }
        )
    }
}