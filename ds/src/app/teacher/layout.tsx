'use client'

import Navbar from "@/components/teacher/navbar/navbar";
import ClassDrawer from "@/components/teacher/drawer/drawer";
import { Box, Stack } from "@mui/material";

export default function teacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<Stack
      direction="row">
			<ClassDrawer />
      <Box
        display={"grid"}
        gridTemplateRows={"auto 1fr"}
        height={"100%"}
        flex={1}
      >
        <Navbar />
        {children}
      </Box>
    </Stack>
	)
}
