'use client'

import Navbar from "@/components/teacher/navbar/navbar";
import Drawer from "@/components/teacher/drawer/drawer";
import { Box } from "@mui/material";

export default function teacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<>
			<Drawer />
      <Box
        display={"grid"}
        gridTemplateRows={"auto 1fr"}
        height={"100%"}>
        <Navbar />
        {children}
      </Box>
    </>
	)
}
