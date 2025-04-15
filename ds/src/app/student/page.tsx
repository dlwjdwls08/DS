'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import './style.css'
import PageButton from "@/components/pagebutton/pagebutton"
import StatusDiv from "@/components/student/status/status";

export default function StudentPage() {
	return (
    <>
			<div id='large-div'>
				<StatusDiv/>

				<div id='button-div'>
					<PageButton
						title="선생님께 연락"
						url="/student/chatting" />
					<PageButton
						title="과거 기록"
						url="/student/previous" />
				</div>
			</div>
    </>
  )
}