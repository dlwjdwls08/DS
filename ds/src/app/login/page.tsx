'use client'

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router";

export default function Page() {
    const { data: session } = useSession();
    // const router = useRouter();

    console.log(session);

    return (
        <div>
            <h1>로그인 페이지</h1>
            <button onClick={() => signIn("google")} type="button">로그인</button>
        </div>
    )
}