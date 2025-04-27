'use client'

import { Message } from "@mui/icons-material"
import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box, Typography, IconButton, Backdrop, Stack, Card, CardMedia, CardContent, Table, TableRow, TableCell, List, ListItem, Badge } from "@mui/material"
import { Student, AbsenceLog, Memo, NightClass, Leave } from "@prisma/client"
import axios from "axios"
import { stat } from "fs"
import { memo, TouchEvent, useEffect, useMemo, useRef, useState } from "react"
import { StudentInfo } from "../classtype/type"
import { time } from "console"

export type StudentData = {
  studentInfo: Student
  state: boolean | null
}

type MemoData = {
  content: string,
  time: string
}

type ClassData = Pick<NightClass, "start" | "end" | "className">

function NameText({name}:{name:string}){
  let fontSize: string;

  if(name.length > 30){
    fontSize = '7px'
  }
  else if(name.length > 20){
    fontSize = '9px'
  }
  else if(name.length > 10){
    fontSize = '11px'
  }
  else{
    fontSize = '16px';
  }
  
  
  return <Typography
    sx={{
      fontSize: fontSize,
      wordBreak: ''
    }}>
    {name}
  </Typography>
}

export default function StudentCard({ studentInfo }: { studentInfo: StudentInfo }) {
  const [state, setState] = useState<boolean | null>(null)
  const [isAvailable, setAvailable] = useState<boolean>(true)
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [memoData, setMemoData] = useState<MemoData[]>([])
  const [leaveData, setLeaveData] = useState<Leave>()
  const [nightClassData, setNightClassData] = useState<ClassData>()

  const holdTimeOut = useRef<NodeJS.Timeout | null>(null)
  const holdThreshold = 1000

  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
		setState(studentInfo.absence?.state ?? null)
		setLeaveData(studentInfo.leave)
		setNightClassData(studentInfo.class)
    setMemoData(studentInfo.memo?.map(m => ({
      content: m.content,
      time: m.time.toString()
    })) ?? [])
  }, [])

  // console.log(studentInfo)
  // console.log(state)
  // console.log(leaveData)
  // console.log(nightClassData)
  // console.log(memo)

  function StartHold() {
    holdTimeOut.current = setTimeout(() => {
      holdTimeOut.current = null
      axios.get(`/api/teacher/memo/${studentInfo.student.studentID}`)
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

  function handleMove(e: TouchEvent) {
    const touch = e.touches[0]
    const bounds = buttonRef?.current?.getBoundingClientRect()

    if (!bounds) return

    if (touch.clientX < bounds.left || touch.clientX > bounds.right || touch.clientY < bounds.top || touch.clientY > bounds.bottom) {
      CancelHold()
    }
  }

  function handleStateChange() {
    if (nightClassData || leaveData) {
      return
    }
    setAvailable(false)
    if (state === null) {
      setState(true)
      axios.post(`/api/absence/${studentInfo.student.studentID}`, {
        state: true
      })
        .then(res => res.data)
        .then((data) => {
          setAvailable(true)
        })
    }
    else if (state === true) {
      setState(false)
      axios.put(`/api/absence/${studentInfo.student.studentID}`, {
        state: false
      })
        .then(res => res.data)
        .then((data) => {
          setAvailable(true)
        })
    }
    else {
      setState(null)
      axios.delete(`/api/absence/${studentInfo.student.studentID}`)
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
          width: "80px",
          height: "80px",
          maxHeight: "80px"
        }}
        variant="outlined">
        <Badge
          color="error"
          variant="dot"
          invisible={!memoData || !(new Date(memoData[0]?.time) >= new Date(Date.now() - 10 * 60 * 1000))}>  

          <Button
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: ["white", "lightgreen", "salmon", "lightblue"][(nightClassData || leaveData) ? 3 : state === null ? 0 : (state ? 1 : 2)] as any,
              color: "black",
              width: "80px",
              height: "80px",
              maxHeight: "80px",
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
            {studentInfo.student.grade >= 1 && <Typography
              sx={{
              width: 'calc(100% - 4px)',
              textAlign: 'left',
              lineHeight: "1em",
              fontSize: 11
              }}>
              {studentInfo.student.seat}  
            </Typography>}
            <NameText name={studentInfo.student.name}/>
            <Typography
              sx={{
                fontSize: 10
              }}
            >{studentInfo.student.studentID}</Typography>
          </Button>
        </Badge>
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
                image={`https://keis.ksa.hs.kr//uploadfiles/SCTSTUDENTN/${studentInfo.student.studentID}.jpg`}
                alt="로딩중"
                height="200" />
              <CardContent>
                <Stack gap="10px" justifyContent="center">
                  <Box>{studentInfo.student.studentID}</Box>
                  <Box>{studentInfo.student.name}</Box>
                  <Box>{studentInfo.student.grade}학년</Box>
                  <Box>{studentInfo.student.classNo}반</Box>
                </Stack>
              </CardContent>
            </Card>
            <List
              sx={{ width: "500px", height: "400px", maxHeight: "400px", overflowY: "scroll" }}>
              {memoData.map((memo, idx) => (
                <ListItem
                  key={idx}>
                  <Stack gap="10px">
                    <Typography fontSize="12pt">{memo.content}</Typography>
                    <Typography fontSize="10pt" color="textDisabled">{new Date(memo.time).toLocaleTimeString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}</Typography>
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
