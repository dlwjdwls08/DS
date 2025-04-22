'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import React from "react"
import { StudentInfo } from "./type"

export function Chang8_1({ students }: { students: StudentInfo[] }) {

  const startNo = 1 

  return (
    <Box sx={{
      overflowX: 'auto',
      overflowY: 'scroll',
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}  
    >
			<Grid2 container wrap="wrap">
				{Array.from({ length: 9 }, (_, i) => (

				<Grid2 size={12} key={`${i}-0`} sx={{ mb: i % 2 === 1 ? 0 : 3 }}>
					<Grid2 container key={`${i}-1`} sx={{justifyContent:'center'}}>
						
						{(i === 8) && (
							<Box sx={{display:"flex"}}>
								<Door transparent={true} />
								<Door transparent={true} />
							</Box>
						)}
						{Array.from({ length: 7 }, (_, j) => {
								if(j==2) return <Placeholder transparent={true} key={7} />
								if(j>=3) j-=1
								const student = students.find((studentInfo) => studentInfo.student.seat === startNo + i*6+j)
								return (
									<Grid2 key={`${i}-${j}`}>
										{student ? (
											<StudentCard key={j} studentInfo={student} />
										) : (
											<Placeholder />
										)}
									</Grid2>
								)}
						)}
						{(i === 8) && (
							<Box sx={{display:"flex"}}>
								<Door transparent={true} />
								<Door/>
							</Box>
						)}
					</Grid2>

				</Grid2>
				))}
			</Grid2>
        
    </Box>
  )
}



export function Chang8_2({ students }: { students: StudentInfo[] }) {

  const startNo = 55

  return (
    <Box sx={{
      overflowX: 'auto',
      overflowY: 'scorll',
    }}  
    >
			<Grid2 container wrap="wrap">
				{Array.from({ length: 2 }, (_, i) => (
					<Grid2 size={12} key={`${i}-0-0`} sx={{ mb: i % 2 === 0 ? 0 : 4 }}>
						<Grid2 container key={`${i}-1`} wrap="nowrap" sx={{justifyContent:'center'}}>
							
							{Array.from({ length:9 }, (_, j) => {
									if(j==4 || j<=1) {
										return (
										<Grid2 key={`${i}-${j}-2`}>
											<Placeholder transparent={true} key={-j} />
										</Grid2>
										)
									}
									if(j<=3) j-=2
									else if(j>=5) j-=3

									const student = students.find((studentInfo) => studentInfo.student.seat === startNo + i*6 + j)
									return (
										<Grid2 key={`${i}-${j}`}>
											{student ? (
												<StudentCard key={j} studentInfo={student} />
											) : (
												<Placeholder />
											)}
										</Grid2>
									)}
							)}
						</Grid2>
					</Grid2>
				))}

				
				{Array.from({ length: 8 }, (_, i) => (
					<Grid2 size={12} key={`${i+2}-0`} sx={{ mb: i % 2 === 0 ? 0 : 4 }}>
						<Grid2 container key={`${i}-1`} sx={{justifyContent:'center'}}>
							
							{Array.from({ length: 9 }, (_, j) => {
									if(j==4) return (
										<Grid2 key={`${i+2}-${j}-2`}>
											<Placeholder transparent={true} key={7} />
										</Grid2>
									)
									if(j>=5) j-=1
									const student = students.find((studentInfo) => studentInfo.student.seat === startNo + 12 + i*8 + j)
									return (
										<Grid2 key={`${i}-${j}`} >
											{student ? (
												<StudentCard key={j} studentInfo={student} />
											) : (
												<Placeholder />
											)}
										</Grid2>
									)}
							)}
						</Grid2>

					</Grid2>
				))}

				{Array.from({ length: 4 }, (_, i) => (
					<Grid2 size={12} key={`${i}-0-0`} sx={{ mb: i % 2 === 0 ? 0 : 4 }}>
						<Grid2 container sx={{justifyContent:'center'}}>
							
							{Array.from({ length:9 }, (_, j) => {
									if(i==3 && j==2)	return(
										<Grid2 key={`${i}-${j}-2`} size={1}>
											<Door garo={true} key={-j} />
										</Grid2>
									)

									if(i==2 && j==0) return (
										<Grid2 key={`${i}-${j}-2`} size={1}>
											<Door key={-j} />
										</Grid2>
									)

									if(j<=4 || j== 8 || i==3) {
										return (
										<Grid2 key={`${i}-${j}-2`}>
											<Placeholder transparent={j>=5?false:true} key={-j} />
										</Grid2>
										)
									}
									j -= 4
									const student = students.find((studentInfo) => studentInfo.student.seat === startNo + 75 + i*3 + j)
									return (
										<Grid2 key={`${i}-${j}`}>
											{student ? (
												<StudentCard key={j} studentInfo={student} />
											) : (
												<Placeholder />
											)}
										</Grid2>
									)}
							)}
						</Grid2>
					</Grid2>
				))}


			</Grid2>
        
    </Box>
  )
}