"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {axios} from 'axios';

const SignupPage = () => {
  const [user, setUser] = React.useState({
    username:"",
    email:"",
    password:"",
  });

  console.log(user)

  const submitHandler = (e) =>{
    e.preventDefault();
  }

  const onChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser((prev)=>({...prev, [name]:value}))
  }


  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={submitHandler}>
        <input onChange={onChangeHandler} type="text" name="username" value={user.username} id="" placeholder='Username' />
        <br />
        <br />
        <input onChange={onChangeHandler} type="email" name="email" value={user.email} id="" placeholder='Email' />
        <br />
        <br />
        <input onChange={onChangeHandler} type="password" name="password" value={user.password} id="" placeholder='Password' />
        <br />
        <br />
        <button type="submit">Signup</button>
      </form>
      <br />
      <br />
      <Link href="/login">visit Login page</Link>
    </div>
  )
}

export default SignupPage
