'use client'

import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { getSession, SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar/navbar"
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <div
          style={{display:"grid",gridTemplateRows:"auto auto"}}>
            {pathname !== "/landing" && <Navbar></Navbar>}
            {children}
          </div>
          
        </SessionProvider>
      </body>
    </html>
  );
}
