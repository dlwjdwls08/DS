'use client'

import { useClassState, useDrawerState } from "@/store/store";
import { ListItemButton, SwipeableDrawer, List, ListItem, Divider, Box, Stack, ListItemText, LinearProgress, Drawer, Button } from "@mui/material"
import { Room } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProgressData = {
  name: string,
  value: number
}

export default function ClassDrawer() {
  const router = useRouter();
  
  const { isOpen, open, close } = useDrawerState()
  const { classID=1, change } = useClassState()

  const [rooms, setRooms] = useState<Room[]>([])

  const [progressData, setProgressData] = useState<ProgressData[]>([])

  useEffect(() => {
    axios.get("/api/room")
    .then((res) => res.data)
    .then((data) => {setRooms(data)})

    axios.get("/api/room/progress")
    .then(res => res.data)
    .then((data) => {
      const fixedData:ProgressData[] = []
      for (const progress of data.progressData) {
        fixedData.push({
          name: progress.name,
          value: progress.active_count / progress.total_count * 100
        })
      }
      setProgressData(fixedData)
    })
    .catch((error) => {
      console.error(error)
    })
  }, [ classID ])


  function handleChange(roomNo: number) {
    change(roomNo)
    router.push(`/teacher/class/${roomNo}`)
  }

  const today = new Date().toLocaleDateString('ko-kr');

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={close}
      variant="persistent"
      sx={{
        width: isOpen ? "200px" : "0",
        height: "100vh"
      }}
      >
      <Stack
        width="200px"
        height="100vh">
        <Stack
          height="95px"
          justifyContent="center"
          alignContent="center"
          textAlign="center"
        >
          {today}
        </Stack>
        <Divider />
        <List
          sx={{
            overflowY: 'scroll',
          }}>
          {rooms.map((room, idx) => (
            <ListItem
            disablePadding
            key={idx}>
              <Stack
                width="100%">
                <ListItemButton
                  selected={classID === room.id}
                  onClick={() => handleChange(room.id)}>
                    <Stack
                      padding="0 10px"
                      width="100%"
                      justifyContent="center">
                      <ListItemText sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        {room.name}
                      </ListItemText>
                      <LinearProgress
                        variant="determinate"
                        value={progressData.find((v, i) => v.name === room.name)?.value ?? 0}
                        color={progressData.find((v, i) => v.name === room.name)?.value === 100 ? "success" : "primary"}
                        sx={{borderRadius: 2, justifySelf:"stretch"}}/>
                    </Stack>
                </ListItemButton>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Drawer>
  )
}