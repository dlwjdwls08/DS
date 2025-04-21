'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard, {StudentData} from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import React from "react"

export default function EOZ({ students, floor }: { students: Student[], floor: number }) {

  // 시작 좌석 번호
  const startNo = floor=== 3 ? 73: 101;

  return (
    <Box sx={{
      width: '100vw',
      height: '75vh',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      flexDirection: 'row',
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}  
    >
      <Box sx={{
        margin: '20px',
        width: '200vw',
        height: '60%',
        flexShrink: 0,
        display: 'flex',
        flexDirection:'column',
      }}>
        <Grid2 container wrap='nowrap' sx={{ p:2}}>
          {Array.from({ length: 20 }, (_, i) => {
            const student = students.find((student) => student.seat === (startNo + i))
            return <Box sx={{width: '130px', flexShrink:0}} key={i}>
              {student ? (
                <StudentCard student={student} />
              ) : (
                <Placeholder />
              )}
            </Box>
          })}
        </Grid2>
      
        <Grid2 container wrap='nowrap' sx={{p:2}}>
          {Array.from({ length: 4 }, (_, outerIdx) => (
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 130 * (outerIdx!=3 ? 6 : 3),
              flexShrink: 0,
            }}
              key={outerIdx}>
            <Grid2 container> 

              {Array.from({ length: 2 }, (_, innerIdx) => {
                const student = students.find((s) => s.seat === (startNo + 20 + 7 - ( outerIdx*2 + innerIdx )))
                return (
                  <Box sx={{width: '130px'}} key={innerIdx}>
                  {student ? (
                    <StudentCard student={student} />
                  ) : (
                    <Placeholder />
                  )}
                  </Box>
                )
              })}

              {outerIdx!=3 && Array.from({ length: 4 }, (_, innerIdx) => (
                <Box sx={{width: '130px'}}>
                  <Grid2 key={`placeholder-${outerIdx * 2 + innerIdx}`}>
                    <Placeholder transparent={true} />
                  </Grid2>
                </Box>
              ))}

            </Grid2>
            </Box>
          ))}

      

        </Grid2>
      </Box>
    </Box>
  )
}