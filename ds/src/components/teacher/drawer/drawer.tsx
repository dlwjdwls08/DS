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
  
  // useEffect(() => {
  //   axios.get("/api/class")
  //   .then((res) => res.data)
  //   .then((data) => setClasses(data))
  // }, [])

  // 가짜 데이터
  useEffect(() => {
    const dummyClasses: Class[] = [
      { id: 1, name: "클래스 1" } as Class,
      { id: 2, name: "클래스 2" } as Class,
      { id: 3, name: "클래스 3" } as Class,
    ];
    setClasses(dummyClasses);
  }, []);
  // 가짜 데이터


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
          sx={{
            height: "80px"
          }}>
          {today}
        </ListItem>
        <Divider />
        {classes?.map((cls, idx) => (
          <ListItem
          disablePadding
          key={idx}>
            <ListItemButton
              selected={classID === cls.id}
              onClick={() => handleChange(cls.id)}>
                {cls.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  )
}