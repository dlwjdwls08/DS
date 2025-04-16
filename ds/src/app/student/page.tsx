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




export default function StudentPage() {
	const session = useSession()
	const studentID = session.data?.user?.email?.slice(0,6)
	

	return (
    <>
			<div id='large-div'>
				<StatusDiv/>
				<div id='button-div'>
					<div id='profile-div'>
						<PageButton
							title="선생님께 연락"
							url="/student/chatting" />
					</div>
					
					<Paper elevation={3} style={{ borderRadius: '20px', padding: '0px 20px', display: 'flex', flexDirection: 'column' }}>
						<div id='previous'>
							<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
								<h2>과거 결석 기록</h2>
								<h3>N회</h3>
							</div>

							<div id="prev-date-list">
								<p>3/12 (목)</p>
								<p>3/13 (금)</p>
								<p>3/13 (금)</p>
								<p>3/13 (금)</p>
							</div>
						</div>
					</Paper>
				</div>
			</div>
    </>
  )
}