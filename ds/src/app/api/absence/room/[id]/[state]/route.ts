import { Update } from "@mui/icons-material";
import { Prisma, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// 전부 체크 or 전부 제거
export async function POST(req:NextRequest, {params}: { params: { id: string, state: string } }){
	const {id, state: raw} = await params;
    const targetState = raw==='true';

	try {
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

		const now = new Date();
		const today = dayjs(now)


		// absence 전체 제거
		await prisma.absenceLog.deleteMany({
			where:{
				date: {
					gte : new Date(today.year(), today.month(), today.date()),
					lt : new Date(today.year(), today.month(), today.date()+1)
				},
				studentID: {in: studentIDs}
			},
		})
		
		// (결석일때만) 전부 추가
		if(targetState == false){
			return NextResponse.json({status:200})
		}	

		const newLogArray: { studentID: string, state: boolean, date: Date }[] = [];
		studentIDs.forEach(stdId => {
			newLogArray.push({
				studentID: stdId,
				date: now,
				state: true
			});
		});

		await prisma.absenceLog.createMany({
			data: newLogArray
		})
		return NextResponse.json({status:200})
	}
	catch (e) {
		console.error(e);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  	}	
		
}