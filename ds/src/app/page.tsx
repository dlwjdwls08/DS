'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/landing");
    }
  })
  
  return (
    <div>
      Welcome, {session?.user?.email}!
    </div>
  )
}
