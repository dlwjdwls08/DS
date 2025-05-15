'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useDrawerState } from '@/store/store'

export default function Navbar() {
  const { flip } = useDrawerState()
  const { data: session } = useSession()

  return (
    <nav id="navbar">
      <div></div>
      <div
        style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
        <div className="menu">  
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>KSA</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>TTEND</span>
        </div>
      </div>

      <div
        style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography sx={{fontSize:'16px', color:'black', fontWeight:'bold' }}>{session?.user?.name}</Typography>
        <Button id="logout" onClick={() => signOut({callbackUrl:"/landing"})}>
          <Typography sx={{color:"black"}}>로그아웃</Typography>
        </Button>
      </div>
    </nav>
  )
}