'use client'

import { useClassState, useDrawerState } from "@/store/store";
import { ListItemButton, SwipeableDrawer, List, ListItem, Divider, Box, Stack, ListItemText, LinearProgress } from "@mui/material"
import { Room } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Drawer() {
  const router = useRouter();
  
  const { isOpen, open, close } = useDrawerState()
  const { classID, change } = useClassState()

  const [rooms, setRooms] = useState<Room[]>()
  
  useEffect(() => {
    axios.get("/api/room")
    .then((res) => res.data)
    .then((data) => {setRooms(data); console.log(data)})
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
              height: "80px"
            }}>
            {today}
          </ListItem>
          <Divider />
          {rooms?.map((room, idx) => (
            <ListItem
            disablePadding
            key={idx}>
              <Stack
                width="100%">
                <ListItemButton
                  selected={classID === room.id}
                  onClick={() => handleChange(room.id)}>
                    <ListItemText inset primary={room.name} />
                </ListItemButton>
                <LinearProgress
                  variant="buffer"
                  value={10}
                  valueBuffer={20}
                  sx={{height: 6, borderRadius: 2}}/>  
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}