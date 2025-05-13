import { Check, Create, Send } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, InputBase, List, ListItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { Memo } from "@prisma/client";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";

type MemoData = {
    content: string,
    time: string
}

export default function MemoDiv() {
    const [memoData, setMemoData] = useState<MemoData[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)

    const [memoValue, setMemoValue] = useState<string>("")


    useEffect(() => {
        axios.get("/api/student/memo")
        .then((res) => res.data)
        .then((data) => {
            setMemoData(data.memoData)
        })
    }, [])

    const handleSendMemo = () => {
        if (!memoValue) return
        axios.post("/api/student/memo", { content: memoValue })
        .then((res) => res.data)
        .then((data) => {
            setMemoData(prev => [{ content: data.memo.content, time: data.memo.time }, ...prev])
            setMemoValue("")
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
        <Paper elevation={3} style={{ borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column'}}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="300px"
                height="200px">
                <Box
                    display="flex"
                    flex={1}
                    justifyContent="center"
                    alignItems="center">
                    {memoData.length && (dayjs(memoData[0].time) >= dayjs().subtract(10, 'minutes')) ? (
                    <Typography variant="h4">
                        {memoData[0].content}
                    </Typography>
                    ): (
                    <Typography variant="h4">
                        메모 없음
                    </Typography>
                    )}
                </Box>
                <IconButton
                    onClick={() => setDialogOpen(true)}>
                    <Create />
                </IconButton>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}>
                <DialogTitle>메모</DialogTitle>
                <DialogContent>
                    <List
                        sx={{width: "500px", height: "400px", maxHeight: "400px", overflowY: "scroll"}}>
                        {memoData.map((memo, idx) => (
                        <ListItem
                            key={idx}>
                            <Stack gap="10px">
                                <Typography fontSize="12pt">{memo.content}</Typography>
                                <Typography fontSize="10pt" color="textDisabled">{dayjs(memo.time).format("YY. MM. DD. HH:mm")}</Typography>
                            </Stack>
                        </ListItem>
                        ))}
                    </List>
                    <Divider sx={{margin: "20px 0"}}/>
                    <Stack direction="row">
                        <Box
                            flex={1}>
                            <Input
                                placeholder="해당 메시지는 모든 선생님이 확인할 수 있습니다."
                                fullWidth
                                value={memoValue}
                                onChange={(e) => setMemoValue(e.target.value)} />
                        </Box>
                        <IconButton
                            onClick={handleSendMemo}>
                            <Send />
                        </IconButton>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDialogOpen(false)}>
                        완료
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}