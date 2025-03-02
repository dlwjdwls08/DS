'use client'

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

interface User {
	name: string;
	email: string;
}

export default function Home() {
  const [data, setData] = useState<Array<User>>([]);

  useEffect(() => {
    axios.get(`/api`)
    .then((res) => res.data)
    .then((data) => setData(data))
  }, []);
  
  async function addUser() {
    axios.post(`/api`, {
      name: "이재빈",
      email: "gamil"
    })
		.then((res) => res.data)
		.then((data) => console.log(data));
  }

  return (
    <div>
      {data.map((user, index) => (
				<div key={index}>
					<p>name: {user.name}</p>
					<p>email: {user.email}</p>
				</div>
			))}
      <button onClick={addUser}>
				인구 추가
      </button>
    </div>
  );
}
