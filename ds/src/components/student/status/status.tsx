'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { IconButton, Box, Paper } from '@mui/material'
import { stat } from 'fs'

export default function StatusDiv(){

	const { data: session } = useSession()
	const emali = session?.user?.email
	const name = session?.user?.name

	// 나중에 API로 상태 받아오기
	var status = '자습중'
	if(false){
		status = '이석'
	}
	if(false){
		status = '결석' 
	}


	return(
	<Paper id='layout-box' elevation={3}>
		<Box>
			<h1 id='title'> {status} </h1>
			<p style={{textAlign:'center'}}>여기다가 예쁜 그래픽 넣기~</p>

			<div id='user-info'>
					<p>{emali?.slice(0,6)} {name}</p>
			</div>
		</Box>
	</Paper>
	)
}