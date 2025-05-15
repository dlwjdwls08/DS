'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Alert, AlertTitle, Box, Button, Collapse, IconButton, Paper, Stack, SwipeableDrawer, TextField, Zoom } from "@mui/material";
import { useDrawerState } from "@/store/store";
import { Teacher } from "@prisma/client";
import { Close } from "@mui/icons-material";


export default function TeacherPage() {
	const [teacherList, setTeacherList] = useState<Teacher[]>([])
  const [getName, setName] = useState<string>("")
  const [inputActive, SetInputActive] = useState<boolean>(true)

  const handleClick = () => {
    axios.post("/api/teacher/name", {name: getName})
    .then(res => res.data)
    .then(data => {
      SetInputActive(false);
      window.dispatchEvent(new Event("teacherNameChanged")); // 커스텀 이벤트 발생
    })
  }

  return (
    <Box
      display="flex"
      flex="1 0 0"
      flexWrap="wrap"
      gap="20px"
      padding="50px"
      justifyContent="center"
      alignContent="center">
      <Stack gap="10px" justifyContent="center" alignItems="center">
        <TextField placeholder="성함" disabled={!inputActive} value={getName} onChange={(e) => setName(e.target.value)} variant="standard" sx={{width: "200px", textAlign: "center"}} helperText={false} />
        <Collapse in={inputActive}>
          <Button
            onClick={handleClick}
            fullWidth>
            완료
          </Button>
        </Collapse>
        <Zoom in={!inputActive}>
          <Alert
            severity="success"
            onClose={() => SetInputActive(true)}>
            <AlertTitle>확인되었습니다</AlertTitle>
            안녕하세요, {getName} 선생님
          </Alert>
        </Zoom>
        
        
        
      </Stack>

    </Box>
  )
}