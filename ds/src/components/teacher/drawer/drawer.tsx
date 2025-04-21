'use client'

import { useClassState, useDrawerState } from "@/store/store";
import { ListItemButton, SwipeableDrawer, List, ListItem, Divider, Box, Stack, ListItemText, LinearProgress } from "@mui/material"
import { Room } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProgressData = {
  name: string,
  value: number
}

export default function Drawer() {
  const router = useRouter();
  
  const { isOpen, open, close } = useDrawerState()
  const { classID, change } = useClassState()

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
  }, [])


  function handleChange(roomNo: number) {
    change(roomNo)
    router.push(`/teacher/class/${roomNo}`)
  }

  const today = new Date().toLocaleDateString('ko-kr');

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={close}
      onOpen={open}>
      <Box
        width="200px">
        <List>
          <ListItem
            sx={{
              height: "80px",
              justifyContent: 'center',
              alignContent: "center"
            }}>
            {today}
          </ListItem>
          <Divider />
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
                      width="100%">
                      <ListItemText inset primary={room.name}/>
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
      </Box>
    </SwipeableDrawer>
  )
}