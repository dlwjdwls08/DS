import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// get Classes
export async function GET(req:NextRequest) {
    const classes = await prisma.class.findMany()
    return NextResponse.json(classes)
}