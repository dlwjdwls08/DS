import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        await prisma.leave.createMany({
            data: body
        })
        return NextResponse.json(
            {}
        )
    }
    catch (e) {
        console.log(e)
        return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
    }
}