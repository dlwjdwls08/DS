'use client'

import Drawer from "@/components/admin/drawer/drawer";
import Navbar from "@/components/admin/navbar/navbar";
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
