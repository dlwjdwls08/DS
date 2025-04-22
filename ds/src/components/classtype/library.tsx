'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard, {StudentData} from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import React from "react"
import { StudentInfo } from "./type"
import { tree } from "next/dist/build/templates/app-page"

export default function Library({ students }: { students: StudentInfo[] }) {

  // 시작 좌석 번호
  const startNo = 129;

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center'
			
    }}  
    >
      <Grid2 container sx={{height:'50vh', width:'200px'}}>
        {Array.from({ length: 6 }, (_, i) => {
						const student = students.find((studentInfo) => studentInfo.student.seat === startNo + (5-i))
            return (
            <Grid2 key={i} margin={0} padding={0} size={8}>
						{student ? (
							<StudentCard studentInfo={student}/>
						) : (
							<Placeholder/>
						)}
            </Grid2>
        )})}

				<Door transparent={true} garo={true} />
				<Door transparent={true} garo={true} />
				<Door transparent={true} garo={true} />
				<Door garo={true} />
      </Grid2>

			<Grid2 container sx={{ display: 'flex', flexDirection: 'column' }}>
				{Array.from({ length: 3 }, (_, i) => {
					const s1 = students.find((studentI) => studentI.student.seat === startNo + 6 + 4*i + 0);
					const s2 = students.find((studentI) => studentI.student.seat === startNo + 6 + 4*i + 1);
					const s3 = students.find((studentI) => studentI.student.seat === startNo + 6 + 4*i + 2);
					const s4 = students.find((studentI) => studentI.student.seat === startNo + 6 + 4*i + 3);
					return (
						<Grid2 container key={`grid_${i}`} sx={{
							width: 220,
							height: 160,
							marginBottom: '20px'
						}}>
							<Grid2 key={startNo + 6 + 4*i + 0}>
								{s2
								 ? <StudentCard studentInfo={s2} />
								 : <Placeholder/>
								}
							</Grid2>
							<Grid2 key={startNo + 6 + 4*i + 1}>
								{s1
								 ? <StudentCard studentInfo={s1} />
								 : <Placeholder/>
								}
							</Grid2>
							<Grid2 key={startNo + 6 + 4*i + 2}>
								{s3 
								 ? <StudentCard studentInfo={s3} />
								 : <Placeholder/>
								}
							</Grid2>
							<Grid2 key={startNo + 6 + 4*i + 3}>
								{s4
								 ? <StudentCard studentInfo={s4} />
								 : <Placeholder/>
								}
							</Grid2>
						</Grid2>
					)
				})}
		</Grid2>

			
    </Box>
  )
}