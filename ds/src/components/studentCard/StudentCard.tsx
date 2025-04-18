'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box } from "@mui/material"
import { Student, AbsenceLog } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<boolean | null>(false)
  
  useEffect(()=>{ 
    axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => setState(data))
  })
    
    
  function handleStateChange() {
    axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => setState(data))

    if(state === null){
      setState(true)
    }
    else if(state === true){
      setState(false)
    }
    else {
      setState(null)
    }
    
    if (state === null || state === false)
      axios.post('/api/absence',{
        id: student.id,
        date: new Date(),
        add: (state===null) ? "Add" : "Remove"
      })
    
    
     
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
          <div>{student.name}</div>
          <div>{student.studentID}</div>
        </Button>
      </Paper>
    </>
  )
}
