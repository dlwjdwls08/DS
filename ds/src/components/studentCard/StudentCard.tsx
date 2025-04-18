'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box } from "@mui/material"
import { Student, AbsenceLog } from "@prisma/client"
import { useEffect, useState } from "react"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

export default function StudentCard({ student }: { student: StudentData }) {
  const [state, setState] = useState<boolean | null>(student.state)

  useEffect

  function handleStateChange() {
    if(state == null) setState(true);
    else if(state) setState(false);
    else setState(null);
    
    
     
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
            backgroundColor: ["white","lightgreen","salmon"][state===null ? 0 : (state ? 1 : 2)] as any,
            color: "black",
          }}>
          <div>{student.studentInfo.name}</div>
          <div>{student.studentInfo.studentID}</div>
        </Button>
      </Paper>
    </>
  )
}
