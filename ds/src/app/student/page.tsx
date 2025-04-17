'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import './style.css'
import PageButton from "@/components/pagebutton/pagebutton"
import StatusDiv from "@/components/student/status/status";
import { Paper } from "@mui/material";
import { Leave, NightClass } from "@prisma/client";
import AbsenceDiv from "@/components/student/absence/absence";
import MemoDiv from "@/components/student/absence/memo";




export default function StudentPage() {
	const session = useSession()
	
	
	return (
    <>
			<div id='large-div'>
				<StatusDiv/>
				<div id='button-div'>
					<MemoDiv />
					
					<AbsenceDiv />
				</div>
			</div>
    </>
  )
}