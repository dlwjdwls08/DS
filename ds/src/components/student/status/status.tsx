'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { IconButton, Box, Paper } from '@mui/material'
import { stat } from 'fs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Leave, NightClass } from '@prisma/client'
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

<<<<<<< Updated upstream
dayjs.extend(utc)
dayjs.extend(timezone)
=======
type ClassData = {
	className: string,
	start: Date,
	end: Date
}
>>>>>>> Stashed changes

type ClassData = Pick<NightClass, "day" | "className">

type LeaveData = {
	date: string
}

export default function StatusDiv(){

	const { data: session, status: sessionStatus } = useSession()
	const email = session?.user?.email
	const name = session?.user?.name

	
	const [classData, setClassData] = useState<ClassData[]>([])
	const [leaveData, setLeaveData] = useState<LeaveData[]>([])
	const [getStatus, setStatus] = useState<string>("자습중")

	useEffect(() => {
		if (sessionStatus !== "authenticated") return
		axios.get("/api/student/state")
		.then((res) => res.data)
		.then((data) => {
			const today = dayjs().tz('Asia/Seoul')
			const date = new Date(today.year(), today.month(), today.date())
			const {leavedata, classdata} : {leavedata:LeaveData[], classdata:ClassData[]} = data
			setLeaveData(leavedata)
			if (leavedata.findIndex((v) => new Date(v.date).getTime() == date.getTime()) !== -1) {
				setStatus("자습 이석")
			}
			setClassData(classdata)
			if (classdata.findIndex((v) => v.day === today.day()) !== -1) {
				setStatus("수업중")
			}
		})
		.catch((error) => {
			console.error(error)
		})
	}, [sessionStatus])

	// 나중에 API로 상태 받아오기


	return(
	<Paper id='layout-box' elevation={3}>
		<Box
			display="grid"
			gridTemplateRows="auto auto 50px">
			<h1 id='title'> {getStatus} </h1>
			<Box
				display="flex"
				flexDirection="column"
				padding="0 20px">
				{classData.length > 0 && (
				<Box>
					<h3>수업</h3>
					{classData.map((cls, idx) => (
					<Box key={idx}>
						<Box>{cls.className} - {"일월화수목금토"[cls.day]}</Box>
					</Box>
					))
					}
				</Box>
				)}
				{leaveData.length > 0 && (
				<Box>
					<h3>이석</h3>
					{leaveData.map((leave, idx) => (
					<Box key={idx}>
						<Box>{dayjs(leave.date).tz('Asia/Seoul').format("YYYY. MM. DD")}</Box>
					</Box>
					))}
				</Box>
				)}
			</Box>
		</Box>
	</Paper>
	)
}