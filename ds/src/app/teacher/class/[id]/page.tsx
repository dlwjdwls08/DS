'use client'

import Hyungsul from "@/components/classtype/hyungsul"
import EOZ from "@/components/classtype/eoz"
import { Class, Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState, use } from "react"



export default function ClassPage({ params }: { params: Promise<{ id: string }>}) {
  const [getClass, setClass] = useState<Class>()

  const [students, setStudents] = useState<Student[]>([])

  const { id } = use(params)

  // useEffect(() => {
  //   if (!id) return
  //   axios.get(`/api/class/${id}`)
  //   .then((res) => res.data)
  //   .then((data) => {
  //     setClass(data)
  //   })
  //   axios.get(`/api/class/${id}/students`)
  //   .then((res) => res.data)
  //   .then((data) => {
  //     setStudents(data)
  //   })
  // }, [id])

  // 가짜 데이터
  useEffect(() => {
    const dummyClass: Class = {
      id: 1,
      name: "클래스 1",
      type: 1,
    } as Class
    setClass(dummyClass)

    const dummyStudents: Student[] = [
      {id: 1, name: "학생 1", studentID: "24-001", grade: 1, room: "1-1", classNo: "1", seat: 1} as Student,
      {id: 2, name: "학생 2", studentID: "24-002", grade: 1, room: "1-1", classNo: "2", seat: 2} as Student,
      {id: 3, name: "학생 3", studentID: "24-003", grade: 1, room: "1-1", classNo: "3", seat: 3} as Student,
      {id: 4, name: "학생 4", studentID: "24-004", grade: 1, room: "1-1", classNo: "4", seat: 4} as Student,
      { id: 5, name: "학생 5", studentID: "24-005", grade: 1, room: "1-1", classNo: "5", seat: 5 } as Student,
      { id: 6, name: "학생 6", studentID: "24-006", grade: 1, room: "1-1", classNo: "6", seat: 6 } as Student,
      { id: 7, name: "학생 7", studentID: "24-007", grade: 1, room: "1-1", classNo: "7", seat: 7 } as Student,
      { id: 8, name: "학생 8", studentID: "24-008", grade: 1, room: "1-1", classNo: "8", seat: 8 } as Student,
      { id: 9, name: "학생 9", studentID: "24-009", grade: 1, room: "1-1", classNo: "9", seat: 9 } as Student,
      { id: 10, name: "학생 10", studentID: "24-010", grade: 1, room: "1-1", classNo: "10", seat: 10 } as Student,
      { id: 11, name: "학생 11", studentID: "24-011", grade: 1, room: "1-1", classNo: "11", seat: 11 } as Student,
      { id: 12, name: "학생 12", studentID: "24-012", grade: 1, room: "1-1", classNo: "12", seat: 12 } as Student,
      { id: 13, name: "학생 13", studentID: "24-013", grade: 1, room: "1-1", classNo: "13", seat: 13 } as Student,
      { id: 14, name: "학생 14", studentID: "24-014", grade: 1, room: "1-1", classNo: "14", seat: 14 } as Student,
      { id: 15, name: "학생 15", studentID: "24-015", grade: 1, room: "1-1", classNo: "15", seat: 15 } as Student,
      { id: 16, name: "학생 16", studentID: "24-016", grade: 1, room: "1-1", classNo: "16", seat: 16 } as Student,
      { id: 17, name: "학생 17", studentID: "24-017", grade: 1, room: "1-1", classNo: "17", seat: 17 } as Student,
      // { id: 18, name: "학생 18", studentID: "24-018", grade: 1, room: "1-1", classNo: "18", seat: 18 } as Student,
      { id: 19, name: "학생 19", studentID: "24-019", grade: 1, room: "1-1", classNo: "19", seat: 19 } as Student,
      { id: 20, name: "학생 20", studentID: "24-020", grade: 1, room: "1-1", classNo: "20", seat: 20 } as Student,
      { id: 21, name: "학생 21", studentID: "24-021", grade: 1, room: "1-1", classNo: "21", seat: 21 } as Student,
      { id: 22, name: "학생 22", studentID: "24-022", grade: 1, room: "1-1", classNo: "22", seat: 22 } as Student,
      { id: 23, name: "학생 23", studentID: "24-023", grade: 1, room: "1-1", classNo: "23", seat: 23 } as Student,
      { id: 24, name: "학생 24", studentID: "24-024", grade: 1, room: "1-1", classNo: "24", seat: 24 } as Student,
      { id: 25, name: "학생 25", studentID: "24-025", grade: 1, room: "1-1", classNo: "25", seat: 25 } as Student,
      { id: 26, name: "학생 26", studentID: "24-026", grade: 1, room: "1-1", classNo: "26", seat: 26 } as Student,
      { id: 27, name: "학생 27", studentID: "24-027", grade: 1, room: "1-1", classNo: "27", seat: 27 } as Student,
      { id: 28, name: "학생 28", studentID: "24-028", grade: 1, room: "1-1", classNo: "28", seat: 28 } as Student,
    ]
    setStudents(dummyStudents)
  }
  , [])

  return (
    <>
      <h1 style={{justifySelf:'center'}}>{/*getClass.name*/'제목'}</h1>
      {getClass?.type === 1 && <Hyungsul students={students} />}
      {getClass?.type === 2 && <EOZ students={students} floor={3}/>}

    </>
  )
}