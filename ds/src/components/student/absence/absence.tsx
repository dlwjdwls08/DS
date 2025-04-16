import { ThumbUp } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, Paper } from "@mui/material";
import { AbsenceLog } from "@prisma/client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type AbsenceData = Pick<AbsenceLog, "date">

export default function AbsenceDiv() {
    const [absenceData, setAbsenceData] = useState<AbsenceData[]>([])

    const thumbButton = useRef<HTMLButtonElement>(null)
    const [thumbButtonSize, setThumbButtonSize] = useState(50)

    useEffect(() => {
        axios.get("/api/student/absence")
        .then((res) => res.data)
        .then((data) => {
            setAbsenceData(data.absenceData)
            console.log(data)
        })
    }, [])

    const onThumbClick = () => {
        if (thumbButton.current) {
            console.log("a")
            thumbButton.current.animate([
                    { transform: "rotate(15deg) scale(1.1)"},
                    { transform: "rotate(-15deg) scale(1.1)"},
                    { transform: "scale(1)"},
                ],
                {
                    duration: 500,
                    easing: "ease-in-out"
                }
            )
            setThumbButtonSize((v) => v + 10)
        }
    }

    return (
        <Paper elevation={3} style={{ borderRadius: '20px', padding: '0px 20px', display: 'flex', flexDirection: 'column' }}>
            <Box
                width="300px"
                height="250px"
                display="flex"
                flexDirection="column">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>과거 결석 기록</h2>
                    <h3>{absenceData.length}회</h3>
                </div>
                <Divider />
                {absenceData.length ? (
                <List
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        overflowY: "scroll",
                        '&::-webkit-scrollbar-thumb': {
                            borderRadius: "4px"
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: "transparent"
                        }
                    }}>
                    {absenceData.map((absence, idx) => {
                        const time = new Date(absence.date)
                        return (
                            <ListItem
                                key={idx}>
                                {time.getUTCMonth() + 1}/{time.getUTCDate()} ({"일월화수목금토"[time.getUTCDay()]})
                            </ListItem>
                        )
                    })}
                </List>
                ) : (
                <Box
                    width="100%"
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <IconButton
                        color="primary"
                        sx={{
                            fontSize: thumbButtonSize+"px"
                        }}
                        ref={thumbButton}
                        onClick={onThumbClick}>
                        <ThumbUp fontSize="inherit"/>
                    </IconButton>
                    
                </Box>
                )
                }
                
            </Box>
        </Paper>
    )
}