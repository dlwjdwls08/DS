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
    </Stack>
	)
}
