'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { Student } from "@prisma/client"
import { useEffect, useState } from "react"

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<boolean | null>(null)

  function handleStateChange() {
    setState(!state)
  }

  return (
    <>
      <Paper
        sx={{
          display: "grid",
          gridTemplate: "auto",
          width: "100px",
          height: "100px",
        }}
        variant="outlined"
        onClick={handleStateChange}>
        <Button
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: state ? "lightgreen" : state === null ? "white" : "salmon",
            color: "black",
          }}>
          <div>{student.name}</div>
          <div>{student.studentID}</div>
        </Button>
      </Paper>
    </>
  )
}