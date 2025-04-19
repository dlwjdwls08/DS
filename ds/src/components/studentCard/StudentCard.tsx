'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box } from "@mui/material"
import { Student, AbsenceLog } from "@prisma/client"
import axios from "axios"
import { stat } from "fs"
import { useEffect, useState } from "react"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<boolean | null>(null)
  
  useEffect(()=>{ 
    axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => {
      setState(data.stateData);
    })
  }, [])

    
  async function handleStateChange() {
    await axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => {
      setState(data.stateData);
    })

    if(state === null){
      setState(true)
      await axios.post(`/api/absence/${student.studentID}`,{
        state: true
      })
    }
    else if(state === true){
      setState(false)
      await axios.delete(`/api/absence/${student.studentID}`)
      await axios.post(`/api/absence/${student.studentID}`,{
        state: false
      })
    }
    else {
      setState(null)
      await axios.delete(`/api/absence/${student.studentID}`)
    }
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
          <Box sx={{lineHeight: '1.5em', maxHeight: '3em'}}>{student.name}</Box>
          <Box>{student.studentID}</Box>
        </Button>
      </Paper>
    </>
  )
}
