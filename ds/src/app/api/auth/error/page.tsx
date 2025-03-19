"use client";

import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  useEffect(() => {
    signOut({ callbackUrl: "/" }).then(() => {
      console.log("a");
    });
  }, []);

  return (
    <div>
      <h1>로그인 실패</h1>
      <p>허용되지 않은 이메일입니다.</p>
    </div>
  );
}