'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useDrawerState } from '@/store/store'
import { Box } from 'lucide-react'

export default function Navbar() {
  const { flip } = useDrawerState()

  return (
    <nav id="navbar">
      <div
      style={{display:"flex",flexShrink:0,justifyContent:"center",alignItems:"center", width:'150px'}}>
        <IconButton onClick={flip}>
          <Menu />
        </IconButton>
        <div style={{ width: '200px', height: '30px', alignSelf:'center', justifySelf:'center', textAlign:'center'}}>자습실 선택</div>
      </div>
      <div></div>
      <div
      style={{display:"flex", alignContent:"center", justifyContent:"center", padding:"20px"}}>
        <div className="menu">
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>KSA</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'black' }}>TTEND</span>
        </div>
      </div>
      <div
      style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div id="logout" onClick={() => signOut({callbackUrl:"/landing"})}>로그아웃</div>
      </div>
    </nav>
  )
}