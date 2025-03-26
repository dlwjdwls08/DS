'use client'

import Navbar from "@/components/navbar/navbar";
import Drawer from "@/components/drawer/drawer";

export default function teacherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<>
      <Navbar />
			<Drawer />
      {children}
    </>
	)
}
