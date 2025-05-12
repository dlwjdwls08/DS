import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import exp from "constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

const prisma = new PrismaClient();

// get Absence List of the date
export async function GET(req: NextRequest) {
	const today = dayjs().tz('Asia/Seoul')
	const date = new Date(today.year(), today.month(), today.date())
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
