'use client'

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "./style.css";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";


export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      router.replace("/");
    }
  })

  return (
    <div id="main-container">
      <div id="left-container">
        <div
        style={{display:"flex",flexDirection:"column",gap:"30px"}}>
          <div id="title-container">
            <div style={{color:"blue"}}>KSA</div><div>TTEND</div>
          </div>
          <div>
            <div className="sub-title-text">
              한국과학영재학교 DS
            </div>
          </div>
        </div>
      </div>
      <div id="right-container">
				<div
        style={{display:"flex",flexDirection:"column",gap:"20px"}}>
          <div id="login-button" onClick={() => signIn("google")}>구글 계정으로 로그인</div>
        </div>
      </div>
    </div>
  )
}