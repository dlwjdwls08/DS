import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const studentID = session?.user?.email?.slice(0, 6)
        const absences = await prisma.absenceLog.findMany({
            select: {
                date: true
            },
            where: {
                studentID: {
                    equals: studentID
                }
            }
        })
        return NextResponse.json(
            { absenceData: absences }
        )
    }
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}