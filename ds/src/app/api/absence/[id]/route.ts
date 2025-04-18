import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Bold } from "lucide-react";
import { removeRequestMeta } from "next/dist/server/request-meta";

const prisma = new PrismaClient();

// return the state of the student
export async function GET( { params }: { params: { id: string } }) {
	try {
		const {id} = await params
		const today = new Date()
		const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
		const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

		const info = await prisma.absenceLog.findFirst({
			where: {
				studentID: id,
				date: {
					gte: start,
					lt: end,
				},
			},
		})  

		return NextResponse.json(info?.state)

	}
	catch {
			// return NextResponse.json({ error: "DB Error" }, { status: 500 })
			return NextResponse.json(null)
	}
    
}


// update Student to Absecne List
export async function POST(req: NextRequest, {params} : {params: {id: string}}) {
	const {id} = await params

	let body: {date: string, state: boolean}
	try {
		body = await req.json()
	} catch {
		return NextResponse.json(
			{error: 'Invalid json form'}
		)
	}

	const {date, state} = body
	await prisma.absenceLog.create({
		data: { studentID: id, date: new Date(date), state: state }
	});		  

	return NextResponse.json({message: "Success"});
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
	const {id} = await params;

	let body: {date: string}
	try {
		body = await req.json()
	} catch {
		return NextResponse.json(
			{error: 'Invalid json form'}
		)
	}

	const {date} = body
	const today = new Date(date)
	const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

	const info = await prisma.absenceLog.findFirst({
		where: {
			studentID: id,
			// date: {
			// 	gte: start,
			// 	lt: end,
			// },
		},
	})  

	if (info === null) {
		return NextResponse.json({error: 'DB Error'}, {status: 500})
	}

	await prisma.absenceLog.deleteMany({
		where: {
			studentID: id,
			// date: {
			// 	gte: start,
			// 	lt: end,
			// },
		},
	})

	return NextResponse.json({ message: "Deleted successfully" }, { status: 201 });

}