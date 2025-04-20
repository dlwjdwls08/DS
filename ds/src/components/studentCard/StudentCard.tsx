'use client'

import { Message } from "@mui/icons-material"
import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box, Typography, IconButton, Backdrop, Stack, Card, CardMedia, CardContent, Table, TableRow, TableCell, List, ListItem } from "@mui/material"
import { Student, AbsenceLog, Memo } from "@prisma/client"
import axios from "axios"
import { stat } from "fs"
import { TouchEvent, useEffect, useRef, useState } from "react"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

type MemoData = {
  content: string,
  time: string
}

export default function StudentCard({ student }: { student: Student }) {
  const [state, setState] = useState<boolean | null>(null)
  const [isAvailable, setAvailable] = useState<boolean>(true)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [memoData, setMemoData] = useState<MemoData[]>([])
  
  const holdTimeOut = useRef<NodeJS.Timeout | null>(null)
  const holdThreshold = 1000

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(()=>{ 
    axios.get(`/api/absence/${student.studentID}`)
    .then((res) => res.data)
    .then((data) => {
      setState(data.stateData);
    })
  }, [])

  function StartHold() {
    holdTimeOut.current = setTimeout(() => {
      holdTimeOut.current = null
      axios.get(`/api/teacher/memo/${student.studentID}`)
      .then(res => res.data)
      .then((data) => {
        setMemoData(data.memoData)
      })
      setDialogOpen(true)
    }, holdThreshold)
  }

  function EndHold() {
    if (holdTimeOut.current) {
      clearTimeout(holdTimeOut.current)
      handleStateChange()
    }
  }

  function CancelHold() {
    if (holdTimeOut.current) {
      clearTimeout(holdTimeOut.current)
    }
  }

  function handleMove (e: TouchEvent) {
    const touch = e.touches[0]
    const bounds = buttonRef?.current?.getBoundingClientRect()

    if (!bounds) return

    if (touch.clientX < bounds.left || touch.clientX > bounds.right || touch.clientY < bounds.top || touch.clientY > bounds.bottom) {
      CancelHold()
    }
  }

  function handleStateChange() {
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
            maxHeight: "100px",
            '& .MuiTouchRipple-root .MuiTouchRipple-rippleVisible': {
              animationDuration: `${holdThreshold}ms`
            }
          }}
          ref={buttonRef}
          onMouseDown={StartHold}
          onMouseUp={EndHold}
          onTouchStart={StartHold}
          onTouchEnd={EndHold}
          onMouseLeave={CancelHold}
          onTouchCancel={CancelHold}
          onTouchMove={handleMove}
          disabled={!isAvailable}>
          <Typography
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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md">
        <DialogContent>
          <Stack direction="row" gap="10px" alignItems="center" justifyContent="center">
            <Card
              elevation={3}>
              <CardMedia 
                component="img"
                image={`https://keis.ksa.hs.kr//uploadfiles/SCTSTUDENTN/${student.studentID}.jpg`}
                alt="로딩중"
                height="300"/>
                <CardContent>
                  <Stack gap="10px" >
                    <Box>{student.studentID}</Box>
                    <Box>{student.name}</Box>
                    <Box>{student.grade}학년</Box>
                    <Box>{student.classNo}반</Box>
                  </Stack>
                </CardContent>
            </Card>
            <List
              sx={{width: "500px", height: "400px", maxHeight: "400px", overflowY: "scroll"}}>
              {memoData.map((memo, idx) => (
              <ListItem
                key={idx}>
                <Stack gap="10px">
                  <Typography fontSize="12pt">{memo.content}</Typography>
                  <Typography fontSize="10pt" color="textDisabled">{new Date(memo.time).toLocaleTimeString("ko-KR", {year:"2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"})}</Typography>
                </Stack>
              </ListItem>
              ))}
            </List>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
