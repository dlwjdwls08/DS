'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box } from "@mui/material"
import { Student } from "@prisma/client"
import { useEffect, useState } from "react"

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<number | null>(null)

  function handleStateChange() {
    if (state === null) {
      setState(1)
      return state
    }
    setState((state+1)%3)
    return state
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
            backgroundColor: ["white","lightgreen","salmon"][state ? state : 0] as any,
            color: "black",
          }}>
          <div>{student.name}</div>
          <div>{student.studentID}</div>
        </Button>
      </Paper>
    </>
  )
}
