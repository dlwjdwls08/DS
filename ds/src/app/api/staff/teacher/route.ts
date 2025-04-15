import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Student, Teacher } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const teachers = await prisma.teacher.findMany({
    select: {
        grade: true,
        classNo: true,
        name: true
    }
  });
  return NextResponse.json(teachers)
}

export async function POST(req: NextRequest) {
  try {
    const body: Teacher[] = await req.json()
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Teacher" RESTART IDENTITY CASCADE`);
    await prisma.teacher.createMany({
            data: body
        })
    return NextResponse.json(
            {},
            { status: 201 }
        )
  }
  catch {
    return NextResponse.json(
            { error: "DB Error" },
            { status: 500 }
        )
  }
}