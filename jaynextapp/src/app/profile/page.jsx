"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = ({}) => {
  const router = useRouter();

  const logoutUser = async () =>{
    try {
      await axios.get("api/users/logout");
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default page
