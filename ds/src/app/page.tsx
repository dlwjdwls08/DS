'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, Star } from "lucide-react";
import "./style.css";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const userInfo = {
    like: 125,
    star: 7,
    ranking: 3,
  }
  
  return (
    <div id="main-container">
            
    </div>
  )
}
