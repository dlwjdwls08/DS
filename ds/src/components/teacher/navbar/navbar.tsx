'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'
import { Menu } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { useDrawerState } from '@/store/store'
import { Box } from 'lucide-react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { flip } = useDrawerState()
  const [getName, setName] = useState<string>("")

  useEffect(() => {
    const fetchName = () => {
      axios.get('/api/teacher/name')
        .then((res) => setName(res.data.name));
    };
    fetchName();

    const onNameChanged = () => {
      fetchName();
    };
    window.addEventListener("teacherNameChanged", onNameChanged);
    return () => window.removeEventListener("teacherNameChanged", onNameChanged);
  }, [])

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
        <Typography sx={{fontSize:'16px', color:'black', fontWeight:'bold' }}>{getName != "" &&  getName + " 선생님"}</Typography>
        <Button id="logout" onClick={() => signOut({callbackUrl:"/landing"})}>
          <Typography sx={{color:"black"}}>로그아웃</Typography>
        </Button>
      </div>
    </nav>
  )
}