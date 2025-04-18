import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import exp from "constants";

const prisma = new PrismaClient();

// get Absence List of the date
export async function GET(req: NextRequest, {params} : {params : {date : Date}}) {
	const {date} = await params
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
