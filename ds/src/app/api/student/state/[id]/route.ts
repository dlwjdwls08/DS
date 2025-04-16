import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: { id: string }}) {
	try {
		const studentID = (await params).id
		const now = new Date()
		const nowKR = new Date(now.toLocaleString('en-US', {
			timeZone: "Asia/Seoul"
		}))
		console.log(now.getUTCHours(), now.getUTCMinutes())
		const time = new Date(Date.UTC(1970, 0, 1, now.getUTCHours(), now.getUTCMinutes()))
		const day = "일월화수목금토"[nowKR.getDay()]
		console.log(time)
		const nightClass = await prisma.nightClass.findFirst({
			select: {
				className: true,
				start: true,
				end: true
			},
			where: {
				studentID: {
					equals: studentID
				},
				start: {
					lte: time
				},
				end: {
					gte: time
				},
				day: {
					equals: day
				}
			}
		})
		const leave = await prisma.leave.findMany({
			select: {
				reason: true,
				start: true,
				end: true
			},
			where: {
				studentID: {
					equals: studentID
				},
				start: {
					lte: now
				},
				end: {
					gte: now
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