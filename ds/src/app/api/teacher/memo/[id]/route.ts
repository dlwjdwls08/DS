import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        const { id } = await params
        const memos = await prisma.memo.findMany({
            select: {
                content: true,
                time: true
            },
            where: {
                studentID: {
                    equals: id
                }
            },
            orderBy: {
                time: "desc"
            }
        })
        return NextResponse.json(
            { memoData: memos }
        )
    }
    
    catch {
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}