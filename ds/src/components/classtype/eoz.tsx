'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard, {StudentData} from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import { StudentInfo } from "./type"
import React from "react"

export default function EOZ({ students, floor }: { students: StudentInfo[], floor: number }) {

  // 시작 좌석 번호
  const startNo = floor=== 3 ? 73: 101;

  return (
    <Box sx={{
      display:'flex',
      overflowY: 'hidden',
      // whiteSpace: 'nowrap',
      flexDirection: 'row',
    }}  
    >
      <Box sx={{
        // margin: '20px',
        flexShrink: 0,
        display: 'flex',
        flexDirection:'column',
      }}>
        <Grid2 container wrap='nowrap' sx={{ p:2}}>
          <Door transparent={true}/>
          {Array.from({ length: 20 }, (_, i) => {
            const student = students.find((studentInfo) => studentInfo.student.seat === (startNo + i))
            return <Box sx={{width: '85px', flexShrink:0}} key={i}>
              {student ? (
                <StudentCard studentInfo={student} />
              ) : (
                <Placeholder />
              )}
            </Box>
          })}
          <Door transparent={true}/>
        </Grid2>

        <Grid2 container wrap='nowrap' sx={{p:2}}>
          <Door/>
          {Array.from({ length: 4 }, (_, outerIdx) => (
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              width: 85 * (outerIdx!=3 ? 6 : 2),
              flexShrink: 0,
            }}
              key={outerIdx}>
            <Grid2 container> 

              {Array.from({ length: 2 }, (_, innerIdx) => {
                const student = students.find((s) => s.student.seat === (startNo + 20 + 7 - ( outerIdx*2 + innerIdx )))
                return (
                  <Box sx={{width: '85px'}} key={innerIdx}>
                  {student ? (
                    <StudentCard studentInfo={student} />
                  ) : (
                    <Placeholder />
                  )}
                  </Box>
                )
              })}

              {outerIdx!=3 && Array.from({ length: 4 }, (_, innerIdx) => (
                <Box sx={{width: '85px'}} key={innerIdx}>
                  <Grid2 key={`placeholder-${outerIdx * 2 + innerIdx}`}>
                    <Placeholder transparent={true} />
                  </Grid2>
                </Box>
              ))}

            </Grid2>
            </Box>
          ))}
          <Door/>
        </Grid2>

      </Box>

    </Box>
  )
}