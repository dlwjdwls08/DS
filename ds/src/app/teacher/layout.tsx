'use client'

import Navbar from "@/components/teacher/navbar/navbar";
import Drawer from "@/components/teacher/drawer/drawer";

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
