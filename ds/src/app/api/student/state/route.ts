import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		const studentID = session?.user?.email?.slice(0, 6)
		const nightClass = await prisma.nightClass.findMany({
			select: {
				className: true,
				day: true
			},
			where: {
				studentID: {
					equals: studentID
				}
			},
			orderBy: {
				day: "asc"
			}
		})
		const today = dayjs().tz('Asia/Seoul').startOf('day')
		const date = new Date(today.toISOString())
		const leave = await prisma.leave.findMany({
			select: {
				date: true
			},
			where: {
				studentID: {
					equals: studentID
				},
				date: {
					gte: date
				}
			},
			orderBy: {
				date: "desc"
			}
		})
		return NextResponse.json(
			{ classdata: nightClass, leavedata: leave }
		)
	}
  catch {
		return NextResponse.json(
			{ error: "DB Error" },
			{ status: 500 }
		)
	}
}