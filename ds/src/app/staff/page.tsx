'use client'

import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react"

export default function StaffPage() {
  const [getNightClassFile, setNightClassFile] = useState<File | null>(null)

  function handleFileInput(setter: Dispatch<SetStateAction<File | null>>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setter(event.target.files[0])
      }
    }
  }

  function handleUpload() {
    axios.post("/api/staff", getNightClassFile)
  }

  return (
    <>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileInput(setNightClassFile)} />
      <button onClick={}
    </>
  )
}