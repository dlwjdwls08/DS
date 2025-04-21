'use client'

import Hyungsul from "@/components/classtype/hyungsul"
import EOZ from "@/components/classtype/eoz"
import Chang3 from "@/components/classtype/chang3"
import Library from "@/components/classtype/library"
import {Chang8_1, Chang8_2} from "@/components/classtype/chang8"

import { Leave, Memo, NightClass, Room, Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState, use } from "react"
import { Box,Stack } from "@mui/material"



export default function ClassPage({ params }: { params: Promise<{ id: string }>}) {
  const [room, setRoom] = useState<Room>()

  const [students, setStudents] = useState<Student[]>([])
  const [memos, setMemos] = useState<Memo[]>([])
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [nightClasses, setNightClasses] = useState<NightClass[]>([])

  const { id } = use(params)

  useEffect(() => {
    if (!id) return
    axios.get(`/api/room/${id}`)
    .then((res) => res.data)
    .then((data) => {
      setStudents(data.students)
      setMemos(data.memos)
      setLeaves(data.leaves)
      setNightClasses(data.nightClasses)
      setRoom(data.room)
    })

  }, [id])


  return (
    <Box>
      <Stack>
        <h1 style={{textAlign:'center'}}>{room?.name}</h1>
      </Stack>
      {room?.type === 1 && <Hyungsul students={students} />}
      {room?.type === 2 && room?.name === "형3" && <EOZ students={students} floor={3}/>}
      {room?.type === 2 && room?.name === "형4" && <EOZ students={students} floor={4}/>}
      {room?.type === 3 && <Chang3 students={students}/>}
      {room?.type === 4 && <Library students={students}/>}
      {room?.type === 5 && <Chang8_1 students={students}/>}
      {room?.type === 6 && <Chang8_2 students={students}/>}

    </Box>
  )
}