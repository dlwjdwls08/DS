'use client'

import { Message } from "@mui/icons-material"
import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box, Typography, IconButton } from "@mui/material"
import { Student, AbsenceLog } from "@prisma/client"
import axios from "axios"
import { stat } from "fs"
import { useEffect, useRef, useState } from "react"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<boolean | null>(null)
  
  const nameTypo = useRef<HTMLPreElement>(null)

  const [isAvailable, setAvailable] = useState<boolean>(true)

  useEffect(()=>{ 
    axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => {
      setState(data.stateData);
    })
  }, [])

  useEffect(() => {

  }, [nameTypo])  

  async function handleStateChange() {
    setAvailable(false)
    if(state === null){
      setState(true)
      axios.post(`/api/absence/${student.studentID}`,{
        state: true
      })
      .then(res => res.data)
      .then((data) => {
        setAvailable(true)
      })
    }
    else if(state === true){
      setState(false)
      axios.put(`/api/absence/${student.studentID}`,{
        state: false
      })
      .then(res => res.data)
      .then((data) => {
        setAvailable(true)
      })
    }
    else {
      setState(null)
      axios.delete(`/api/absence/${student.studentID}`)
      .then(res => res.data)
      .then((data) => {
        setAvailable(true)
      })
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
          maxHeight: "100px"
        }}
        variant="outlined">
        <Button
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: ["white","lightgreen","salmon"][state===null ? 0 : (state ? 1 : 2)] as any,
            color: "black",
            width: "100px",
            height: "100px",
            maxHeight: "100px"
          }}
          onClick={handleStateChange}
          disabled={!isAvailable}>
          <Typography
            ref={nameTypo}
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              fontSize: "clamp(2pt, 1em, 1em)",
              lineHeight: "1em"
            }}>
            {student.name}
          </Typography>
          <Typography>{student.studentID}</Typography>
        </Button>
      </Paper>
    </>
  )
}
