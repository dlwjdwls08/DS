'use client'

import { useClassState } from "@/store/store";
import { Dialog, Box, Typography, Stack, ButtonBase } from "@mui/material";
// import { Memo } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Memo = {
  id: string;
  content: string;
  studentID: string;
  student: {
    name: string;
    room: string;
  };
};


export default function MemoDialog({open,onClose}: {open: boolean, onClose: () => void}) {
  const [memoList, setMemoList] = useState([]);
  const { classID, change, setHighlight } = useClassState();
  const router = useRouter();
  
  

  useEffect(() => {
    if (open) {
      axios.get("/api/teacher/memo")
        .then((res) => res.data)
        .then((data) => { setMemoList(data.memoData) });
    }
  }, [open]);

  function handleChange(roomNo: number, studentID: string) {
    setHighlight(studentID);
    change(roomNo)
    router.push(`/teacher/class/${roomNo}`)
    onClose();
  }

  return (
   <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          height: 500,
          backgroundColor: "white",
          borderRadius: 2,
          padding: 2,
        }}
      >
        <Typography>Chat</Typography>
        <Box
          sx={{
            width: '100%',
            height: "calc(100% - 60px)",
            paddingTop: 2,
            alignSelf: "center",
            justifySelf: "center",
            overflowY: "scroll",
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          {memoList.map((M:Memo, index: number) => (
            <ButtonBase
              key={M.id || index}
              onClick={() => {
                handleChange(
                  ["형 206", "형 207", "형 302", "형 303", "형 304", "형 305", "형 306", "형 307", "형 402", "형 404", "형 405", "세미나A", "세미나B", "세미나C", "창8-1", "창8-2", "형 3", "창3", "형 4", "도서관3"].indexOf(M.student.room) + 1,
                  M.studentID
                )
              }}
              sx={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: 2,
                border: "1px solid lightgray",
                padding: 1,
                marginBottom: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack alignItems="flex-start">
                <Typography fontSize={10}>{M.studentID}</Typography>
                <Typography fontSize={14}>{M.student.name}</Typography>
              </Stack>
              <Typography fontSize={18} sx={{ justifySelf: "flex-end" }}> {M.content} </Typography>
            </ButtonBase>
          ))}
        </Box>
      </Box>
   </Dialog>
  )
}


