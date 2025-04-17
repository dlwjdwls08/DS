'use client'

import Hyungsul from "@/components/classtype/hyungsul"
import EOZ from "@/components/classtype/eoz"
import Chang3 from "@/components/classtype/chang3"
// import Library from "@/components/classtype/library"
import {Chang8_1, Chang8_2} from "@/components/classtype/chang8"
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
    const dummyClasses: Class[] = [
      { id: 1, name: "1학년", type: 1 } as Class,
      { id: 2, name: "EOZ", type: 2 } as Class,
      { id: 3, name: "창 3", type: 3 } as Class,
      { id: 4, name: "도서관", type: 4 } as Class,
      { id: 5, name: "창8 - 1", type: 5 } as Class,
      { id: 6, name: "창8 - 2", type: 6 } as Class,
    ]
    const dummyClass = dummyClasses.find(c => c.id.toString() === id) || dummyClasses[0]
    setClass(dummyClass)

    const dummyStudents: Student[] = Array.from({ length: 150 }, (_, index) => {
      const i = index + 1;
      return {
      id: i,
      name: `학생 ${i}`,
      studentID: `24-${i.toString().padStart(3, '0')}`,
      grade: 1,
      room: "1-1",
      classNo: i.toString(),
      seat: i,
      } as Student;
    });
    setStudents(dummyStudents)
  }
  , [])

  return (
    <>
      <h1 style={{justifySelf:'center'}}>{getClass?.name}</h1>
      {getClass?.type === 1 && <Hyungsul students={students} />}
      {getClass?.type === 2 && <EOZ students={students} floor={3}/>}
      {getClass?.type === 3 && <Chang3 students={students}/>}
      {/* {getClass?.type === 4 && <Library students={students}/>} */}
      {getClass?.type === 5 && <Chang8_1 students={students}/>}
      {getClass?.type === 6 && <Chang8_2 students={students}/>}

    </>
  )
}