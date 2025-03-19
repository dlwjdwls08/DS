"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  const { data: session } = useSession();

  console.log(session);
  useEffect(() => {
    signOut({ redirect: false }).then(() => {
      //router.replace("/"); // 로그인 페이지 또는 홈으로 이동
    });
  }, []);

  return (
    <div>
      <h1>로그인 실패</h1>
      <p>허용되지 않은 이메일입니다.</p>
    </div>
  );
}