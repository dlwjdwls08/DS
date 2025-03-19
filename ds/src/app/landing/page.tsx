'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import "./style.css";


export default function LandingPage() {
  return (
    <div id="main-container">
      <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
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
      <div>
				<div>
					<Button variant={"outline"} onClick={() => signIn("google")}>로그인</Button>
				</div>
      </div>
    </div>
  )
}