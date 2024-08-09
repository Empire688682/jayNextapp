"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter()


  const submitHandler = (e) => {
    e.preventDefault();
    loginUser()
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const loginUser = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user);
      if (response.data) {
        setUser({
          email: "",
          password: "",
        });
        router.push("/profile")
      }
    } catch (error) {
      console.log(error);

    }
    finally{
      setLoading(false)
    }
  }


  return (
    <div>
      <h1>{loading? "Processing":"Login"}</h1>
      <form onSubmit={submitHandler}>
        <input onChange={onChangeHandler} type="email" name="email" value={user.email} id="" placeholder='Email' />
        <br />
        <br />
        <input onChange={onChangeHandler} type="password" name="password" value={user.password} id="" placeholder='Password' />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <br />
      <Link href="/signup">visit Signup page</Link>
    </div>
  )
}

export default LoginPage
