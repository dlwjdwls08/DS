'use client'

import { Button, Dialog, DialogContent, DialogTitle, Paper, ToggleButton, ToggleButtonGroup, Box } from "@mui/material"
import { Student } from "@prisma/client"
import { useEffect, useState } from "react"


export function Placeholder({transparent = false}: {transparent?: boolean}) {

  return (
    <>
      <Paper
        sx={{
          display: "grid",
          gridTemplate: "auto",
          width: "80px",
          height: "80px",
          opacity: transparent ? 0 : 1,
        }}
        variant="outlined"
        onClick={() => {}}>
        <Button disabled
          sx={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
          }}>
        </Button>
      </Paper>
    </>
  )
}



export function Door({garo = false, transparent = false }: {garo?: boolean, transparent?: boolean}) {
	return (
		<>
			<Paper
        sx={{
          display: "grid",
          gridTemplate: "auto",
          width: garo ? "80px" : "40px",
					height: garo ? "40px" : "80px",
					opacity: transparent ? 0 : 1,
					borderRadius: "10px",
          flexShrink:0
					
        }}
        variant="outlined"
        onClick={() => {}}>
        <Box 
          sx={{
            display: "flex",
						borderRadius: "inherit",
            gap: "20px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
            color: "black",
          }}>
					문
        </Box>
      </Paper>
		</>
	)
}