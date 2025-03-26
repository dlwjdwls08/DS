'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDrawerState } from '@/store/store'

export default function Navbar() {
  const { flip } = useDrawerState()

  return (
    <nav id="navbar">
      <div
      style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <IconButton onClick={flip}>
          <Menu />
        </IconButton>
      </div>
      <div
      style={{display:"flex",alignItems:"center",padding:"20px"}}>
        <div className="menu">
          
        </div>
      </div>
      <div
      style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div id="logout" onClick={() => signOut({callbackUrl:"/landing"})}>로그아웃</div>
      </div>
    </nav>
  )
}