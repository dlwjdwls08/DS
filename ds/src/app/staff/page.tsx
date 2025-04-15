'use client'

import { Settings } from "@mui/icons-material"
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as XLSX from "xlsx"
import PageButton from "@/components/pagebutton/pagebutton"


export default function StaffPage() {
  const [getNightClassFile, setNightClassFile] = useState<File | null>(null)

  function handleFileInput(setter: Dispatch<SetStateAction<File | null>>) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setter(event.target.files[0])
      }
    }
  }

  async function handleUpload() {
    // axios.post("/api/staff", getNightClassFile)
    const fileBuffer = Buffer.from(await getNightClassFile!.arrayBuffer())
    
    const workbook = XLSX.read(fileBuffer, { type: "buffer" })
    const sheetName = workbook.SheetNames[0]
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

    console.log(data)
  }

  useEffect(() => {
    
  }, [getNightClassFile])

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      width="100%"
      height="100%">
      
      <PageButton
        title="야간 수업"
        url="/staff/setting/night_class" />
      <PageButton
        title="학생 목록" 
        url="/staff/setting/students" />
      <PageButton
        title="교사 목록"
        url="/staff/setting/teacher" />
      <PageButton
        title="자습 이석"
        url="/staff/setting/leave" />
    </Box>
  )
}