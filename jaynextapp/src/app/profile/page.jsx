"use client"
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const router = useRouter();
  const [userId, setUserId] = React.useState("nothing");
  console.log(userId)


  const logoutUser = async () =>{
    try {
      await axios.get("api/users/logout");
      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const getUserData = async () =>{
    try {
     const response = await axios.get("api/users/user");
     console.log(response.data)
     setUserId(response.data.user._id)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <h1>Profile</h1>
      <button onClick={logoutUser}>Logout</button>
      <br />
      <br />
      <button onClick={getUserData}>GetUserData</button> <br /><br />
      <button>{userId === "nothing"? "No Id":<Link href={`/profile/${userId}`}>{userId}</Link>}</button>
    </div>
  )
}

export default page
