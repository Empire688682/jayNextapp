"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignupPage = () => {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter()

  const submitHandler = (e) => {
    e.preventDefault();
    registerUser();
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const registerUser = async () => {
    try {
      setLoading(true)
      const response = await axios.post("api/users/signup", user);
      if (response.data) {
        setUser({
          username: "",
          email: "",
          password: "",
        });
        router.push("/login")
      }

    } catch (error) {
      console.log("Error:", error)
    }
    finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <h1>{loading? "Processing":"Signup"}</h1>
      <form onSubmit={submitHandler}>
        <input required onChange={onChangeHandler} type="text" name="username" value={user.username} id="" placeholder='Username' />
        <br />
        <br />
        <input required onChange={onChangeHandler} type="email" name="email" value={user.email} id="" placeholder='Email' />
        <br />
        <br />
        <input required onChange={onChangeHandler} type="password" name="password" value={user.password} id="" placeholder='Password' />
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
