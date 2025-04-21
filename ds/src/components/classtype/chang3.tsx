'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import React from "react"
import { start } from "repl"

export default function Chang3({ students }: { students: Student[] }) {

  const startNo = 1 

  return (
    <Box sx={{
      width: '100vw',
      height: '120vh',
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
        height: '100%',
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
            <Box key={`${i}`} sx={{flex:'0 0 auto', width: i%2===0 ? '180px' : '100px'}} >
              <Grid2 container rowGap={2} columnGap={1}> 
                {Array.from({ length: 6 }, (_, j) => {
                  const student = students.find((student) => student.seat === startNo + ((i%2===0 && i!=0) ? ((11-i)*6 + (5-j)+1) : ((11-i)*6 + j+1)) )
                  return (
                    <Grid2 key={i*6+j} margin={0} padding={0} size={8} rowGap="16px" columnGap="16px">
                      
                    {student ? (
                      <StudentCard key={(11-i)*6 + j+1} student={student} />
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
    </Box>
  )
}