'use client'

import Navbar from "@/components/student/navbar/navbar";
import { Box } from "@mui/material";

export default function studentLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
      return (
      <Box
          display={"grid"}
          gridTemplateRows={"auto 1fr"}
          height={"100%"}>
          <Navbar />
          <Box
              flexGrow={2}>
              {children}
          </Box>
      </Box>
      )
  }
  