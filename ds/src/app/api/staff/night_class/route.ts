import { NextRequest, NextResponse } from "next/server";
import { NightClass, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const nightClass = await prisma.nightClass.findMany({
    select: {
        studentID: true,
        studentName: true,
        className: true,
        day: true,
        start: true,
        end: true
    }
  });
  return NextResponse.json(nightClass)
}

export async function POST(req: NextRequest) {
  try {
    const body: NightClass[] = await req.json()
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "NightClass" RESTART IDENTITY CASCADE`);
    // await prisma.nightClass.createMany({
    //   data: body
    // })
    await prisma.nightClass.createMany({
      data: body
    })
    return NextResponse.json(
      {},
      { status: 201 }
    )
  }
  catch (e) {
    console.log(e)
    return NextResponse.json(
      { error: "DB Error"},
      { status: 500 }
    )
  }
}