'use client'

import { Container, Grid2, Paper, Box } from "@mui/material"
import { Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard from "../studentCard/StudentCard"
import { Placeholder, Door } from "../studentCard/Card"

export default function Hyungsul({ students }: { students: Student[] }) {

  return (
    <Box sx={{
        width: '100vw',
        height: '100vh',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
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
            {students.map((student, idx) => (
              <StudentCard
              key={idx}
              student={student}>
                </StudentCard>
              ))}
        </Container>
      </Box>
    </Box>
  )
}