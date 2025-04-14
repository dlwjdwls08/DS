'use client'

import { useClassState, useDrawerState } from "@/store/store";
import { ListItemButton, SwipeableDrawer, List, ListItem, Divider } from "@mui/material"
import { Class } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Drawer() {
  const router = useRouter();
  
  const { isOpen, open, close } = useDrawerState()
  const { classID, change } = useClassState()

  const [classes, setClasses] = useState<Class[]>()
  
  useEffect(() => {
    axios.get("/api/class")
    .then((res) => res.data)
    .then((data) => setClasses(data))
  }, [])


  function handleChange(cls_id: number) {
    change(cls_id)
    router.push(`/teacher/class/${cls_id}`)
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
          disablePadding>
          <ListItemButton
            href="/admin/setting">
            세팅
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  )
}