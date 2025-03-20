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
    star: 7
  }
  
  return (
    <div id="main-container">
      <div id="profile">
        <img id="profile-image" src={session?.user?.image!}></img>
        <div id="profile-info">
          <div id="profile-info-name">
            {session?.user?.name}
          </div>
          <div id="profile-info-like">
            <Heart color="red" fill="red"/> 
            <div>{userInfo.like}</div> 
          </div>
          <div id="profile-info-star">
            <Star color="yellowgreen" fill="yellow" />
            <div>{userInfo.star}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
