import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Bold } from "lucide-react";
import { removeRequestMeta } from "next/dist/server/request-meta";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc";
import { error } from "console";

const prisma = new PrismaClient();

dayjs.extend(utc)
dayjs.extend(timezone)

// return the state of the student
export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
	try {
		const {id} = await params
		const today = dayjs().tz('Asia/Seoul')
		const date = new Date(today.year(), today.month(), today.date())
		const info = await prisma.absenceLog.findFirst({
			where: {
				studentID: id,
				date: date
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
export async function POST(req: NextRequest, {params} : {params: Promise<{id: string}>}) {
	try {
		const {id} = await params

		let body: {targetState: boolean, date?: string}
		try {
			body = await req.json()
		} catch {
			return NextResponse.json(
				{ error: 'Invalid json form'},
				{ status: 500 }
			)
		}

		
		const {targetState} = body
		const today = body.date ? dayjs(body.date).tz('Asia/Seoul') : dayjs().tz('Asia/Seoul')
		const date = new Date(today.year(), today.month(), today.date())
		console.log(date)
		await prisma.absenceLog.updateMany({
			where:{ studentID: id, date: date },
			data: { state: targetState }
		});		  

		return NextResponse.json({message: "Success"});
	}
	catch (e) {
		console.log(e)
		return NextResponse.json(
			{ error: "DB Error" },
			{ status: 500 }
		)
	}
	
}
