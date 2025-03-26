'use client'

import { Container, Grid2, Paper } from "@mui/material"
import { Student, User } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import StudentCard from "../studentCard/StudentCard"

export default function Classroom({ students }: { students: Student[] }) {

  return (
    <Container
    fixed
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      margin: "50px auto"
      }}>
      {students.map((student, idx) => (
        <StudentCard
          key={idx}
          student={student}>
        </StudentCard>
      ))}
    </Container>
  )
}