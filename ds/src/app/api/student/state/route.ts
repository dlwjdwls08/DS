import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"

dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		const studentID = session?.user?.email?.slice(0, 6)
		const today = dayjs().tz('Asia/Seoul')
		const nightClass = await prisma.nightClass.findFirst({
			select: {
				className: true,
			},
			where: {
				studentID: {
					equals: studentID
				},
				day: {
					equals: today.day()
				}
			}
		})
		const date = new Date(today.year(), today.month(), today.date())
		const leave = await prisma.leave.findMany({
			where: {
				studentID: {
					equals: studentID
				},
				date: {
					equals: date
				}
			}
		})
		return NextResponse.json(
			{ classData: nightClass, leaveData: leave }
		)
	}
  catch {
		return NextResponse.json(
			{ error: "DB Error" },
			{ status: 500 }
		)
	}
}