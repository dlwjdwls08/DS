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

export default function Chang3({ students }: { students: StudentInfo[] }) {

  const startNo = 1 

  return (
    <Box sx={{
      flexShrink: 0,
      margin: '20px',
    }}>
      <Grid2
        sx={{
          display:"flex",
          flexWrap: "nowrap",
          flexShrink: 0,
          gap: "20px",
          padding: "0 20px"
        }}>
        {Array.from({ length: 12 }, (_, i) => {
          return (
          <Box key={`${i}`} sx={{flex:'0 0 auto', width: i%2===0 ? '120px' : '65px'}} >
            <Grid2 container columnGap={0}> 
              {Array.from({ length: 6 }, (_, j) => {
                const student = students.find((studentInfo) => studentInfo.student.seat === startNo + ((i%2===0 && i!=0) ? ((11-i)*6 + (5-j)) : ((11-i)*6 + j)) )
                return (
                  <Grid2 key={i*6+j} margin={0} padding={0} size={8} rowGap="16px" columnGap="16px">
                    
                  {student ? (
                    <StudentCard key={(11-i)*6 + j+1} studentInfo={student} />
                  ) : (
                    <Placeholder />
                  )}
                  </Grid2>
                )
              })}

              {(i === 1 || i === 10) && (
                <Door garo={true} />
              )}
            </Grid2>
          </Box>
          )}
        )}
      </Grid2>

      
    </Box>
  )
}