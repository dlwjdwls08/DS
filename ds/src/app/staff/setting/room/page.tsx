'use client'

import Chang3 from "@/components/classtype/chang3";
import { Chang8_1, Chang8_2 } from "@/components/classtype/chang8";
import EOZ from "@/components/classtype/eoz";
import Hyungsul from "@/components/classtype/hyungsul";
import { Check, Save } from "@mui/icons-material";
import { Box, Button, Card, List, ListItem, ListItemButton, Paper, Snackbar, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Room } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type RoomData = Pick<Room, "grade" | "type" | "name">

type RoomType = {
    type: number,
    name: string
}

export default function RoomSettingPage() {
    const [room, setRoom] = useState<RoomData[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [roomType, setRoomType] = useState<RoomType[]>([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const router = useRouter()

    const componentList = [Hyungsul, EOZ, Chang3, Chang3, Chang8_1, Chang8_2]

    useEffect(() => {
        axios.get("/api/staff/room")
        .then(res => res.data)
        .then((data) => {
            setRoom(data.roomData)
        })
        .catch((error) => {
            console.error(error)
        })

        axios.get("/api/staff/room/type")
        .then(res => res.data)
        .then((data) => {
            setRoomType(data.roomType)
        })
    }, [])

    const handleSubmit = () => {
        axios.post("/api/staff/room", room)
        .then(res => res.data)
        .then((data) => {
            setSnackbarMessage("저장되었습니다.")
        })
        .catch((error) => {
            console.error(error)
            setSnackbarMessage("에러가 발생했습니다.")
        })
        .finally(() => {
            setSnackbarOpen(true)
        })
    }
    
    return (
        <Stack
            gap="20px"
            padding="50px 50px 0">
            <Box
                display="flex"
                justifyContent="space-between">
                <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    startIcon={<Save />}>
                    저장
                </Button>
                <Button
                variant="contained"
                onClick={() => router.push("/staff")}
                startIcon={<Check />}>
                완료
                </Button>
            </Box>
            <Box
                display="flex"
                alignItems="center">
                <Card
                    elevation={3}>
                    <List
                        sx={{
                            overflowY: "auto",
                            maxHeight: "500px"
                        }}>
                        {room.map((r, idx) => (
                            <ListItem
                                key={idx}>
                                <ListItemButton
                                    selected={selectedIndex === idx}
                                    onClick={() => setSelectedIndex(idx)}>
                                    {r.grade}학년 | {r.name} - {roomType.find((v, idx) => v.type === r.type)?.name ?? "미선택"}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Card>
                <Box
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <ToggleButtonGroup
                        value={room[selectedIndex]?.type}
                        exclusive
                        onChange={(e, v) => {
                            setRoom((prev) => prev.map((item, i) => i === selectedIndex ? {...item, type: v === null ? 0 : v} : item))
                        }}>
                        {roomType.map((t, idx) => (
                            <ToggleButton
                                value={t.type}
                                size="large"
                                key={idx}>
                                {t.name}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
                
            </Box>
            <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={3000}
                message={snackbarMessage}
                anchorOrigin={{vertical:"bottom", horizontal:"right"}}/>
        </Stack>
    )
}