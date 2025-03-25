'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import "./style.css";
import { Drawer } from "@mui/material";


export default function TeacherPage() {
	return (
		<>
			<Drawer anchor="left">

			</Drawer>
		</>
	)
}