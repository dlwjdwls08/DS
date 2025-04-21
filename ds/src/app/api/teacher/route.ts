import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const teachers = await prisma.teacher.findMany()
        return NextResponse.json(
            { teacherData: teachers }
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}