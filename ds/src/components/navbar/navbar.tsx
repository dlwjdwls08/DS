'use client'

import Link from 'next/link'
import './style.css'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav id="navbar">
      <div
      style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Link id="logo"
        style={{display:"flex"}}
        href="/">
          <div
          style={{color: "blue"}}>KSA IN</div>
          <div
          style={{color: "black"}}>SIGHT</div>
        </Link>
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