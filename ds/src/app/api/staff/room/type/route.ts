import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const types = await prisma.roomType.findMany({
            select: {
                type: true,
                name: true
            }
        })
        return NextResponse.json(
            { roomType: types }
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 200 }
        )
    }
}