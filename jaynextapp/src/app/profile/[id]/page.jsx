"use client"
import React from 'react'
import { useParams } from 'next/navigation';

const page = () => {
  const params = useParams();
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p>Welcome back @ <span style={{color:"white", backgroundColor:"black", padding:"15px"}}>{params.id}</span></p>
    </div>
  )
}

export default page
