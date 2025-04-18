import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Bold } from "lucide-react";
import { removeRequestMeta } from "next/dist/server/request-meta";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const prisma = new PrismaClient();

dayjs.extend(utc)

// return the state of the student
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const {id} = await params
		const today = dayjs.utc(new Date())
		const start = new Date(today.year(), today.month(), today.date());
		const tomorrow = today.add(1, 'day')
		const end = new Date(tomorrow.year(), tomorrow.month(), tomorrow.date());
		const info = await prisma.absenceLog.findFirst({
			where: {
				studentID: id,
				date: {
					gte: start,
					lte: end,
				},
			},
		})

		return NextResponse.json(
			{ stateData: info?.state ?? null }
		)
	}
	catch (e) {
		console.log(e)
		return NextResponse.json({ error: "DB Error" }, { status: 500 })
		// return NextResponse.json(null)
	}
    
}


// update Student to Absecne List
export async function POST(req: NextRequest, {params} : {params: {id: string}}) {
	const {id} = await params

	let body: {state: boolean}
	try {
		body = await req.json()
	} catch {
		return NextResponse.json(
			{ error: 'Invalid json form'},
			{ status: 500 }
		)
	}

	const {state} = body
	await prisma.absenceLog.create({
		data: { studentID: id, date: new Date(), state: state }
	});		  

	return NextResponse.json({message: "Success"});
}

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}) {
	const {id} = await params;
	const today = dayjs.utc(new Date())
	const start = new Date(today.year(), today.month(), today.date());
	const tomorrow = today.add(1, 'day')
	const end = new Date(tomorrow.year(), tomorrow.month(), tomorrow.date());
	console.log(start)
	console.log(end)

	const info = await prisma.absenceLog.findFirst({
		where: {
			studentID: id,
			date: {
				gte: start,
				lt: end,
			},
		},
	})  

	if (info === null) {
		return NextResponse.json({error: 'DB Error'}, {status: 500})
	}

	await prisma.absenceLog.deleteMany({
		where: {
			studentID: id,
			date: {
				gte: start,
				lt: end,
			},
		},
	})

	return NextResponse.json({ message: "Deleted successfully" }, { status: 201 });

}