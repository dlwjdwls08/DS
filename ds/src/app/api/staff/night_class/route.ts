import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const nightClass = await prisma.nightClass.findMany({
    select: {
        studentID: true,
        className: true,
        day: true,
        start: true,
        end: true,
        student: {
            select: {
                name: true
            }
        }
    }
  });
  return NextResponse.json(nightClass)
}

type NightClassData = {
  studentID: string,
  className: string,
  studentName: string,
  day: string,
  start: number,
  end: number
}

export async function POST(req: NextRequest) {
  try {
    const body: NightClassData[] = await req.json()
    console.log(body)
    await prisma.nightClass.deleteMany()
    for (const item of body) {
      const {studentID, className, day, start, end} = item
      if (!studentID || !className || !day || !start || !end) {
        return NextResponse.json({ error: "Wrong format"})
      }
      await prisma.nightClass.create({
        data: {
          studentID,
          className,
          day,
          start,
          end
        }
      })
    }
    return NextResponse.json({}, { status: 201 })
  }
  catch {
    return NextResponse.json({ error: "DB Error"})
  }
}