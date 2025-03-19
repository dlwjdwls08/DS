'use client'

import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import "./style.css";
import { useRouter } from "next/navigation";


export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/");
    }
  })

  return (
    <div id="main-container">
      <div id="left-container">
        <div
        style={{display:"flex",flexDirection:"column",gap:"30px"}}>
          <div id="title-container">
            <div style={{color: "blue"}}>
            KSA
            </div>
            <div 
            style={{display: "flex"}}>
            <div style={{color: "blue"}}>IN</div>
            <div style={{color: "black"}}>SIGHT</div>
            </div>
          </div>
          <div>
            <div className="sub-title-text">
              한국과학영재학교 학업봉사부
            </div>
          </div>
        </div>
      </div>
      <div id="right-container">
				<div>
          <div id="login-button" onClick={() => signIn("google")}>KSA 계정으로 로그인</div>
          {status}
        </div>
      </div>
    </div>
  )
}