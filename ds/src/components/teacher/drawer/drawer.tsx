'use client'

import { useClassState, useDrawerState } from "@/store/store";
import { ListItemButton, SwipeableDrawer, List, ListItem, Divider } from "@mui/material"
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
    .then((data) => setRooms(data.room))
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
      onOpen={open}
      sx={{ width: "300px" }}>
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
            <ListItemButton
              selected={classID === room.id}
              onClick={() => handleChange(room.id)}>
                {room.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}