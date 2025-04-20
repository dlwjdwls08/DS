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
      display: 'flex',
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
        width: '160vw',
        height: '60%',
        flexShrink: 0,
      }}>
        <Grid2 container gap={0} rowGap={2}>
                    
          {/* student.seat에 따라서 학생 배치 */}
          {Array.from({ length: 20 }, (_, i) => {
            const student = students.find((student) => student.seat === (startNo + i))
            return <Grid2 key={i} size={0.6} gap={1}>
              {student ? (
                <StudentCard student={student} />
              ) : (
                <Placeholder />
              )}
            </Grid2>
          })}

          {Array.from({ length: 4 }, (_, outerIdx) => (
            <React.Fragment key={outerIdx}>
              {Array.from({ length: 2 }, (_, innerIdx) => {
                const student = students.find((s) => s.seat === (startNo + 20 + 7 - ( outerIdx*2 + innerIdx )))
                return (
                  <Grid2 key={`student-${(outerIdx)*2+innerIdx}`} size={0.6}>
                  {student ? (
                    <StudentCard student={student} />
                  ) : (
                    <Placeholder />
                  )}
                  </Grid2>
                )
              })}

              {Array.from({ length: 4 }, (_, innerIdx) => (
                <Grid2 key={`placeholder-${outerIdx * 2 + innerIdx}`} size={0.6}>
                  <Placeholder transparent={true} />
                </Grid2>
              ))}

            </React.Fragment>
          ))}

      

        </Grid2>
      </Box>
    </Box>
  )
}