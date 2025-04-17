import { Check, Create, Send } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Input, InputBase, List, ListItem, Paper, Stack, TextField } from "@mui/material";
import { Memo } from "@prisma/client";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type MemoData = {
    content: string,
    time: string
}

export default function MemoDiv() {
    const [memoData, setMemoData] = useState<MemoData[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {
        axios.get("/api/student/memo")
        .then((res) => res.data)
        .then((data) => {
            setMemoData(data.memoData)
        })
    }, [])

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
                    {memoData && (new Date(memoData[0]?.time) >= new Date(Date.now() - 10 * 60 * 1000)) ? (
                    <h6>
                        {memoData[0].content}
                    </h6>
                    ): (
                    <h2>
                        메모 없음
                    </h2>
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
                        sx={{width: "500px", height: "400px"}}>
                        {memoData.map((memo, idx) => (
                        <ListItem
                            key={idx}>
                            <Stack>
                                <h5>{memo.content}</h5>
                                <h6>{new Date(memo.time).toLocaleTimeString("ko-KR", {year:"2-digit", month:"2-digit", day:"2-digit", hour: "2-digit", minute: "2-digit"})}</h6>
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
                                fullWidth />
                        </Box>
                        <IconButton>
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