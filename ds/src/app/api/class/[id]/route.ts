import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req:NextRequest, { params }: { params: { id: string } }) {
    const { id } = await params
    const Class = await prisma.class.findUnique({
        where: {
            id: Number(id)
        }
    })
    return NextResponse.json(Class)
}