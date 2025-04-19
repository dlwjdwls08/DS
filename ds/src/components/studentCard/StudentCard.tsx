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
    .then((data) => {setState(data);
      console.log("첫 로딩");
      console.log(data)
    })
  }, [])

    
  async function handleStateChange() {
    await axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => {setState(data);
      console.log("두번쨰 로딩");
      console.log(data)
    })

    if(state === null){
      setState(true)
      await axios.post(`/api/absence/${student.studentID}`,{
        date: new Date(),
        state: true
      })
    }
    else if(state === true){
      setState(false)
      await axios.delete(`/api/absence/${student.studentID}`,{
        data: {
          date: new Date()
        }
      })
      await axios.post(`/api/absence/${student.studentID}`,{
        date: new Date(),
        state: false
      })
    }
    else {
      setState(null)
      await axios.delete(`/api/absence/${student.studentID}`,{
        data: {
          date: new Date()
        }
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
