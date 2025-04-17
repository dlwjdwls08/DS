'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard, { Placeholder } from "../studentCard/StudentCard"
import { arrayBuffer } from "stream/consumers"
import React from "react"

export default function EOZ({ students, floor }: { students: Student[], floor: number }) {

  const startNo = floor=== 3 ? 73 : 101;

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      display: 'flex',
      flexDirection: 'row',
    }}  
    >
      <Box sx={{
        width: '200vw',
        flexShrink: 0,
        height: '100%',
      }}>
        <Grid2 container gap={0} rowGap={2}>
          
          {/* student.seat에 따라서 학생 배치 */}
          {Array.from({ length: 22 }, (_, i) => {
            const student = students.find((student) => student.seat === (startNo + i + 1))
            return <Grid2 key={i} size={0.6}>
              {student ? (
                <StudentCard key={i} student={student} />
              ) : (
                <Placeholder />
              )}
            </Grid2>
          })}


            {Array.from({ length: 3 }, (_, outerIdx) => (
              <React.Fragment key={outerIdx}>

                {Array.from({ length: 4 }, (_, innerIdx) => (
                  <Grid2 key={`placeholder-${outerIdx * 2 + innerIdx}`} size={0.6}>
                    <Placeholder transparent={true} />
                  </Grid2>
                ))}

                {Array.from({ length: 2 }, (_, innerIdx) => {
                  const student = students.find((s) => s.seat === (startNo + 22 + outerIdx*2 + innerIdx + 1))
                  return (
                    <Grid2 key={`student-${outerIdx*2+innerIdx}`} size={0.6}>
                    {student ? (
                      <StudentCard student={student} />
                    ) : (
                      <Placeholder />
                    )}
                    </Grid2>
                  )
                })}
              </React.Fragment>
            ))}

        </Grid2>
      </Box>
    </Box>
    // <Container
    // fixed
    // sx={{
    //   display: "flex",
    //   flexWrap: "wrap",
    //   justifyContent: "center",
    //   gap: "20px",
    //   margin: "50px auto"
    //   }}>
    //   {students.map((student, idx) => (
    //     <StudentCard
    //       key={idx}
    //       student={student}>
    //     </StudentCard>
    //   ))}
    // </Container>
  )
}