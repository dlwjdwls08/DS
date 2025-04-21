'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { IconButton, Box, Paper } from '@mui/material'
import { stat } from 'fs'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Leave, NightClass } from '@prisma/client'

type ClassData = Pick<NightClass, "start" | "end" | "className">


export default function StatusDiv(){

	const { data: session, status: sessionStatus } = useSession()
	const email = session?.user?.email
	const name = session?.user?.name

	
	const [classData, setClassData] = useState<ClassData | null>()
	const [leaveData, setLeaveData] = useState<Leave[] | null>()
	const [getStatus, setStatus] = useState<string>("자습중")

	useEffect(() => {
		if (sessionStatus !== "authenticated") return
		const studentID = session?.user?.email?.slice(0, 6)
		axios.get("/api/student/state")
		.then((res) => res.data)
		.then((data) => {
			setLeaveData(data.leaveData)
			if (data.leaveData.length) {
				setStatus("자습 이석")
			}
			setClassData(data.classData)
			if (data.classData) {
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
				{classData && (
				<Box>
					<h3>수업</h3>
					<Box>
						<Box>{classData.className}</Box>
						<Box>{new Date(classData.start).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit'})} - {new Date(classData.end).toLocaleTimeString("ko-KR", { hour: '2-digit', minute: '2-digit'})}</Box>
					</Box>
				</Box>
				)}
			</Box>
			<div id='user-info'>
			</div>
		</Box>
	</Paper>
	)
}