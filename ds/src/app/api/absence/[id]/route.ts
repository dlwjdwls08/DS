import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// return the state of the student
export async function GET( { params }: { params: { id: string } }) {
    try {
        const {id} = params
        const today = new Date()
        const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const info = await prisma.absenceLog.findFirst({
            where: {
                studentID: id,
                date: {
                    gte: start,
                    lt: end,
                },
            },
        })  

        return NextResponse.json(info?.state)

    }
    catch {
        // return NextResponse.json({ error: "DB Error" }, { status: 500 })
        return NextResponse.json(null)
    }
    
}