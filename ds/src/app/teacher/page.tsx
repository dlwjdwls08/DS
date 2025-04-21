'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Box, Button, Paper, Stack, SwipeableDrawer } from "@mui/material";
import { useDrawerState } from "@/store/store";
import { Teacher } from "@prisma/client";


export default function TeacherPage() {
	const [teacherList, setTeacherList] = useState<Teacher[]>([])
  
  useEffect(() => {
    axios.get("/api/teacher")
    .then(res => res.data)
    .then((data) => {
      setTeacherList(data.teacherData)
    })
  }, [])

  function handleClick() {
    
  }

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="20px"
      padding="50px"
      onClick={handleClick}>
      {teacherList.map((v, idx) => (
        <Paper
          key={idx}
          sx={{
            display: "flex",
            width: "100px",
            height: "100px"
          }}>
          <Button
            color="inherit"
            sx={{
              flex: 1
            }}>
            <Stack justifyContent="center" alignItems="center">
              <Box>{v.name}</Box>
              <Box>{v.grade} - {v.classNo}</Box>
            </Stack>
          </Button>
        </Paper>
      ))}
    </Box>
  )
}