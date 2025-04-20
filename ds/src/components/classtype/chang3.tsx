'use client'

import { Container, Grid2, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { arrayBuffer } from "stream/consumers"
import React from "react"

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
        width: '150vw',
        height: '100%',
        flexShrink: 0,
        margin: '20px',
      }}>
        <Grid2 container
          wrap="nowrap"
        >
          {Array.from({ length: 12 }, (_, i) => {
            return (
            <Grid2 key={i} size={i%2===0 ? 1.0 : 0.6} sx={{flex:'0 0 auto'}} >
              <Grid2 container rowGap={2} columnGap={1}> 
                {Array.from({ length: 6 }, (_, j) => {
                  const student = students.find((student) => student.seat === ((i%2===0 && i!=0) ? ((11-i)*6 + (5-j)+1) : ((11-i)*6 + j+1)) )
                  return (
                    <Grid2 key={i*6+j} margin={0} padding={0} size={8}>
                      
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
            </Grid2>
            )}
          )}
        </Grid2>

        
      </Box>
    </Box>
  )
}