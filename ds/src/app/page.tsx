'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`/api`)
    .then((res) => res.data)
    .then((data) => setData(data))
  })
  
  async function addUser() {
    axios.post(`/api`, {
      name: "이재빈",
      emial: "gamil"
    })
    .then((res) => res.data);
  }

  return (
    <div>
      {data}
      <button onClick={addUser}>

      </button>
    </div>
  );
}
