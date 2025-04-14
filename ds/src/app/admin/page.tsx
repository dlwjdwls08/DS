'use client'

import { Settings } from "@mui/icons-material"
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as XLSX from "xlsx"


export default function AdminPage() {
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
      <Paper
        sx={{
          display: "grid",
          gridTemplate: "auto",
          width: "200px",
          height: "200px",
          
        }}>
        <Button
          color="error"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}>
          <Settings fontSize={"large"}/>
          <Typography variant="h5">
            초기 설정
          </Typography>
        </Button>
      </Paper>
      <Paper
        sx={{
          display: "grid",
          gridTemplate: "auto",
          width: "200px",
          height: "200px",
          
        }}>
        <Button
          color="error"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}>
          <Settings fontSize={"large"}/>
          <Typography variant="h5">
            초기 설정
          </Typography>
        </Button>
      </Paper>
    </Box>
  )
}