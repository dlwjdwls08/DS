// roomlist 내보내기
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req:NextRequest) {
    
    const rooms = await prisma.room.findMany({
        orderBy: {
            id: "asc"
        }
    })

    return NextResponse.json(rooms)
}