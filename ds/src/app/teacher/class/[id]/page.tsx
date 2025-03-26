'use client'

import Classroom from "@/components/classtype/classroom"
import { Class, Student } from "@prisma/client"
import axios from "axios"
import { useEffect, useState, use } from "react"



export default function ClassPage({ params }: { params: Promise<{ id: string }>}) {
  const [getClass, setClass] = useState<Class>()

  const [students, setStudents] = useState<Student[]>([])

  const { id } = use(params)

  useEffect(() => {
    if (!id) return
    axios.get(`/api/class/${id}`)
    .then((res) => res.data)
    .then((data) => {
      setClass(data)
    })
    axios.get(`/api/class/${id}/students`)
    .then((res) => res.data)
    .then((data) => {
      setStudents(data)
    })
  }, [id])

  return (
    <>
      {getClass?.type === 1 && <Classroom students={students} />}
    </>
  )
}