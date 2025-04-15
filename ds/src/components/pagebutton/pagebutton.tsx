'use client'

import { Paper, Button, Typography } from "@mui/material"
import { Settings } from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { Url, UrlObject } from "url"

type PageButtonParams = {
    title: String,
    url: string
}

export default function PageButton({ title, url } : PageButtonParams) {
  const router = useRouter()

  return (
    <Paper
      sx={{
        display: "grid",
        gridTemplate: "auto",
        width: "200px",
        height: "200px",
      }}>
      <Button
        color="inherit"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
        onClick={() => router.push(url)}>
        <Settings fontSize={"large"}/>
        <Typography variant="h5">
          {title}
        </Typography>
      </Button>
    </Paper>
  )
}