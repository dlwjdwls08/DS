'use client'

import Hyungsul from "@/components/classtype/hyungsul"
import EOZ from "@/components/classtype/eoz"
import Chang3 from "@/components/classtype/chang3"
import Library from "@/components/classtype/library"
import { Chang8_1, Chang8_2 } from "@/components/classtype/chang8"
import { Leave, Memo, NightClass, Room, Student, AbsenceLog } from "@prisma/client"
import axios from "axios"
import { useEffect, useState, use } from "react"
import { Box, Stack } from "@mui/material"
import { StudentInfo } from "@/components/classtype/type"

export default function ClassPage({ params }: { params: Promise<{ id: string }>}) {
  const [room, setRoom] = useState<Room>()
  const [loading, setLoading] = useState(true)
  const [studentList, setStudentList] = useState<StudentInfo[]>([])


  const [students, setStudents] = useState<Student[]>([])
  const [memos, setMemos] = useState<Memo[]>([])
  const [leaves, setLeaves] = useState<Leave[]>([])
  const [nightClasses, setNightClasses] = useState<NightClass[]>([])
  const [absences, setAbsences] = useState<AbsenceLog[]>([])

  const { id } = use(params)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      const { data } = await axios.get(`/api/room/${id}`)


      console.log('API GET')
      console.log(data)
      
      
      // 데이터를 상태에 저장
      setStudents(data.students)
      setMemos(data.memos)
      setLeaves(data.leaves)
      setNightClasses(data.nightClasses)
      setAbsences(data.absences)

      // console.log(data.students)
      setRoom(data.room)
      
      // 정렬 
      data.students.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.memos.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.leaves.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.nightClasses.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))
      data.absences.sort((a: { studentID: string }, b: { studentID: any }) => a.studentID.localeCompare(b.studentID))

      const list: StudentInfo[] = [];
      let j = 0, k = 0, l = 0, m = 0
      for (let i = 0; i < data.students.length; i++) {
        var stdInfo = {} as StudentInfo
        const std = data.students[i]
        stdInfo.student = std
        const studentID = std.studentID

        while (data.memos[j] && data.memos[j].studentID === studentID) {
          stdInfo.memo = [data.memos[j]]
          j++
        }
        if (data.leaves[k] && data.leaves[k].studentID === studentID) {
          stdInfo.leave = data.leaves[k]
          k++
        }
        if (data.nightClasses[l] && data.nightClasses[l].studentID === studentID) {
          stdInfo.class = data.nightClasses[l]
          l++
        }
        if (data.absences[m] && data.absences[m].studentID === studentID) {
          stdInfo.absence = data.absences[m]
          m++
        }
        list.push(stdInfo)
      }
      setStudentList(list)
      setLoading(false)

      console.log("students")
      console.log(data.students)
      console.log("studentList")
      console.log(list)
      console.log("absences")
      console.log(data.absences)
    }

    fetchData()
  }, [id])

  if (loading) {
    return <Box sx={{justifySelf:'center', alignSelf:'center'}}>Loading...</Box>
  }

  return (
    <Box>
      <Stack>
        <h1 style={{ textAlign: 'center' }}>{room?.name}</h1>
      </Stack>
      {room?.type === 1 && <Hyungsul students={studentList} />}
      {room?.type === 2 && room?.name === "형3" && <EOZ students={studentList} floor={3}/>}
      {room?.type === 2 && room?.name === "형4" && <EOZ students={studentList} floor={4}/>}
      {room?.type === 3 && <Chang3 students={studentList}/>}
      {room?.type === 4 && <Library students={studentList}/>}
      {room?.type === 5 && <Chang8_1 students={studentList}/>}
      {room?.type === 6 && <Chang8_2 students={studentList}/>}

    </Box>
  )
}