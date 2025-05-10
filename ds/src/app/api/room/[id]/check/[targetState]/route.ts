import { Update } from "@mui/icons-material";
import { Prisma, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Fascinate } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// 전부 체크 or 전부 제거
export async function POST(req:NextRequest, {params}: { params: { id: string, State: string } }){
	const {id, State} = await params;
    const targetState = State==='true';

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

	const targets = await prisma.absenceLog.findMany({
		where:{
			state: {not: targetState},
			date: {
				gte : new Date(today.year(), today.month(), today.date()),
				lt : new Date(today.year(), today.month(), today.date()+1)
			},
			studentID: {in: studentIDs}
		},
	})

	console.log("targets")
	const targetRecords = await targets;
	console.log(targetRecords.map(target => target.id));

	const {count} = await prisma.absenceLog.updateMany({
		where:{
			state: {not: targetState},
			date: {
				gte : new Date(today.year(), today.month(), today.date()),
				lt : new Date(today.year(), today.month(), today.date()+1)
			},
			studentID: {in: studentIDs}
		},
		data:{
			state: targetState,
			date: now
		}
	})
	console.log(`update ${count} rows`)
	return NextResponse.json({status:500})
}