'use client'

import { Book, People, School, Settings } from "@mui/icons-material"
import { Backdrop, Box, Button, Container, Paper, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import * as XLSX from "xlsx"
import PageButton from "@/components/pagebutton/pagebutton"


export default function StaffPage() {
  const [speedDialOpen, setSpeedDialOpen] = useState(false)

  const router = useRouter()

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="30px"
      width="100%"
      height="100%">
      
      <Backdrop
        open={speedDialOpen} />
      <SpeedDial
        ariaLabel=""
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20
        }}
        icon={<Settings />}
        onClose={() => setSpeedDialOpen(false)}
        onOpen={() => setSpeedDialOpen(true)}
        open={speedDialOpen}>
        <SpeedDialAction
          icon={<People />}
          tooltipOpen
          tooltipTitle="학생"
          onClick={() => router.push("/staff/setting/students")} />
        <SpeedDialAction
          icon={<Book />}
          tooltipOpen
          tooltipTitle="수업"
          onClick={() => router.push("/staff/setting/night_class")} />
        <SpeedDialAction
          icon={<School />}
          tooltipOpen
          tooltipTitle="교사"
          onClick={() => router.push("/staff/setting/teacher")} />
      </SpeedDial>
    </Box>
  )
}