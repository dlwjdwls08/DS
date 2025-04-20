import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import exp from "constants";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

dayjs.extend(utc)

const prisma = new PrismaClient();

// get Absence List of the date
export async function GET(req: NextRequest) {
	const today = dayjs(new Date())
	const start = new Date(today.year(), today.month(), today.date());
	const tomorrow = today.add(1, 'day')
	const end = new Date(tomorrow.year(), tomorrow.month(), tomorrow.date());
	const users = await prisma.absenceLog.findMany({
		where: {
			date: {
				gte: start,
				lte: end
			}
		}, 
		orderBy: {
			studentID: 'asc'
		}
	})
	return NextResponse.json(users);
}
