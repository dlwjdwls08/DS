import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)
dayjs.extend(timezone)

const prisma = new PrismaClient();

// get Absence List of the date
export async function GET(req: NextRequest) {
	const today = dayjs().tz('Asia/Seoul').startOf('day')
	const date = new Date(today.toISOString())
	const users = await prisma.absenceLog.findMany({
		where: {
			date: date
		}, 
		orderBy: {
			studentID: 'asc'
		}
	})
	return NextResponse.json(users);
}
