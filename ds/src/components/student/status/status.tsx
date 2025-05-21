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

dayjs.extend(utc)
dayjs.extend(timezone)

type ClassData = Pick<NightClass, "day" | "className">

type LeaveData = {
	date: string
}

type AbsenceData = {
	state: boolean
}

export default function StatusDiv(){

	const { data: session, status: sessionStatus } = useSession()
	const email = session?.user?.email
	const name = session?.user?.name

	
	const [classData, setClassData] = useState<ClassData[]>([])
	const [leaveData, setLeaveData] = useState<LeaveData[]>([])
	const [getStatus, setStatus] = useState<"자습 중" | "출석 완료" | "수업 중" | "자습 이석">("자습 중")

	useEffect(() => {
		if (sessionStatus !== "authenticated") return
		axios.get("/api/student/state")
		.then((res) => res.data)
		.then((data) => {
			const today = dayjs().tz('Asia/Seoul')
			const date = new Date(today.year(), today.month(), today.date())
			const {leavedata, classdata, absencedata} : {leavedata:LeaveData[], classdata:ClassData[], absencedata:AbsenceData} = data
			setLeaveData(leavedata)
			setClassData(classdata)
			if (leavedata.findIndex((v) => new Date(v.date).getTime() == date.getTime()) !== -1) {
				setStatus("자습 이석")
			}
			else if (classdata.findIndex((v) => v.day === today.day()) !== -1) {
				setStatus("수업 중")
			}
			else{
				if(absencedata.state == true){
					setStatus("출석 완료")
				}
				else {
					setStatus("자습 중")
				}
			}

		})
		.catch((error) => {
			console.error(error)
		})
	}, [sessionStatus])

	// 나중에 API로 상태 받아오기

	const colors = {
		"자습 중": ["#EEF064", "#A5E66C", "#4CAF50"],
		"출석 완료": ["#EEF064", "#A5E66C", "#4CAF50"],
		"수업 중": ["#90CAF9", "#1E88E5", "#0D47A1"],
		"자습 이석": ["#90CAF9", "#1E88E5", "#0D47A1"],
		// "결석" : [],
	}

	return(
	<Paper id='layout-box' elevation={3} sx={{display: "flex", justifyContent:'space-between'}}>
		<Box
			display="grid"
			gridTemplateRows="auto auto 50px"
			sx={{ position: "relative", borderRadius: 12, overflow: "hidden",flex:1 }}>
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

			<Box
				component="svg"
				viewBox="0 0 320 240"
				preserveAspectRatio="none"
				sx={{
					position: "absolute",
					bottom: 0,
					left: 0,
					pointerEvents: "none",
					alignSelf: "flex-end",
					justifySelf: "flex-end",
					overflow: "hidden",
				}}
			>
				<path
					d="M0 60 C60 0 140 100 220 40 C280 10 320 70 320 70 L320 240 L0 240Z"
					fill={colors[getStatus][0]}
				/>

				<path
					d="M0 105 C40 130 120 30 200 105 C260 140 320 60 320 80 L320 240 L0 240Z"
					fill={colors[getStatus][1]}
				/>

				<path
					d="M0 150 C35 85 95 215 155 145 C215 105 275 225 320 165 L320 240 L0 240Z"
					fill={colors[getStatus][2]}
				/>
			</Box>
		</Box>
	</Paper>
	)
}