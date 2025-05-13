import { Update } from "@mui/icons-material";
import { Prisma, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

dayjs.extend(utc)
dayjs.extend(timezone)

// 전부 체크 or 전부 제거
export async function POST(req: NextRequest, {params} : {params: Promise<{id: string}>}) {
	try {
		const {id} = await params
		// console.log(id)

		let body: {targetState: boolean}
		try {
			body = await req.json()
		} catch {
			return NextResponse.json(
				{ error: 'Invalid json form'},
				{ status: 500 }
			)
		}

		const {targetState} = body

		const room = await prisma.room.findUnique({ 
			where: {
				id: Number(id)
			},
		})
		if (!room) {
			return NextResponse.json({ error: "Room not found" }, { status: 404 })
		}
		
		const students = await prisma.student.findMany({
			where: {
				room: room.name,
			},
			orderBy:{
				studentID: 'asc'
			}
		})

		const studentIDs = students.map(student => student.studentID);

		const today = dayjs().tz('Asia/Seoul')
		const date = new Date(today.year(), today.month(), today.date())

		// absence 전체 수정
		await prisma.absenceLog.updateMany({
			where:{
				date: date,
				studentID: {in: studentIDs},
			},
			data:{
				state: targetState
			}
		})
		return NextResponse.json({status:200})
	}
	catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  	}	
		
}