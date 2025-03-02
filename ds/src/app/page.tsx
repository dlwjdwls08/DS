'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch(`/api`)
    .then((res) => res.json())
    .then((data) => setData(data));
  })
  
  return (
    <div>
      {data}
    </div>
  );
}
