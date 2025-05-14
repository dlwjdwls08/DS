'use client'

import Navbar from "@/components/teacher/navbar/navbar";
import ClassDrawer from "@/components/teacher/drawer/drawer";
import { Box, Dialog, Stack, useScrollTrigger } from "@mui/material";
import Fab from "@mui/material/Fab";
import { Chat } from "@mui/icons-material";
import MemoDialog from "@/components/teacher/dialog/memoDialog";
import { useState } from "react";

export default function TeacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [dialogOpen, setDialogOpen] = useState(false);
	return (
		<Stack
      direction="row">
			<ClassDrawer />
      <Stack
        display={"grid"}
        gridTemplateRows={"auto 1fr"}
        height={"100vh"}
        maxHeight={"100vh"}
        flex={1}
      >
        <Navbar />
        <Stack
          flex="1 0 0"
          overflow="hidden"
        >
          {children}
        </Stack>
      </Stack>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={() => {setDialogOpen(!dialogOpen)}}
      >
        <Fab color="primary" aria-label="add">
          <Chat />
        </Fab>
      </Box>
      <MemoDialog
        open={dialogOpen}
        onClose={() => {setDialogOpen(false)}}
      />
    </Stack>
	)
}
