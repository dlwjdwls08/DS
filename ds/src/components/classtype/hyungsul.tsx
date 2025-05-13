'use client'

import { Container, Grid2, Paper, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard, {StudentData} from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"
import { StudentInfo } from "./type"

export default function Hyungsul({ students }: { students: StudentInfo[] }) {

  return (
    <Box sx={{
        width: '100%',
        height: 'auto',
        overflowX: 'auto',
        overflowY: 'hidden',
        // whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent:"center",
        alignItems:"center",
    }}>
      <Box sx={{
        width: '100%',
        flexShrink: 0,
        height: '100%',
      }}>

        <Container
          sx={{
            display:"flex",
            flexWrap: "wrap",
            flexShrink: 0,
            gap: "20px",
            margin: "40px auto"
          }}>
            {students.map((studentInfo, idx) => {
              return <StudentCard
                key={idx}
                studentInfo={studentInfo}/>
            })}
        </Container>
      </Box>
    </Box>
  )
}