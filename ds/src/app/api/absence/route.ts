import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

// update Student to Absecne List
export async function POST(req: NextRequest, {params} : {params: {id: string, date: string, add: string }}) {
	const{id, date, add} = await params;
	const date2 = new Date(date);
	if (add == "Add") {
		await prisma.absenceLog.create({
			data: { studentID: id, date: date2 }
		});		  
	}
	else if (add == "Remove") {
		await prisma.absenceLog.deleteMany({
			where: {studentID: id, date: date2 }
		});
	}

	return NextResponse.json({message: "Success"});
}
