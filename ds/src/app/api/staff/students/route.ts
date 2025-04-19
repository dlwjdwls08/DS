import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const students = await prisma.student.findMany({
    select: {
        grade: true,
        classNo: true,
        studentID: true,
        name: true,
        room: true
    }
  });
  return NextResponse.json(students)
}

export async function POST(req: NextRequest) {
  try {
    const body: Student[] = await req.json()
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Student" RESTART IDENTITY CASCADE`);
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Room" RESTART IDENTITY CASCADE`);
    await prisma.student.createMany({
			data: body
		})
    const classGradePair = Array.from(new Set(body.map(s => `${s.grade}.${s.room}`)))
    const classData = classGradePair.map(pair => {
      const [grade, room] = pair.split(".")
      return {
        grade: Number(grade),
        name: room,
        type: 0
      }
    })
    await prisma.room.createMany({
      data: classData
    })
    return NextResponse.json(
			{},
			{ status: 201 }
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