"use client";
import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import Link from 'next/link';

const page = () => {
    const [token, setToken] = useState("");
    const [isverified, setIsverified] = useState(false);
    const [error,setError] = useState(false);

    const letVerifyUser = async() =>{
        console.log("TOKEN:", token)
        try {
            const response = await axios.post("api/users/verifyEmail",{token});
            if(response){
                setIsverified(true);
            }
        } catch (error) {
            console.log("ERROR:", error);
            setError(true);
        }
    };


    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const tokenValue = urlParams.get("token");
        setToken(tokenValue);
    },[]);


    useEffect(()=>{
        console.log("TOKENAFTERTOKEN:", token)
        if(token.length > 0 || ""){
            letVerifyUser();
        }
    },[token]);

  return (
    <div>
      <button>
      {
        isverified? <Link href="/">Please Verify</Link>:"No token"
      }
      </button>
      {
        error && <p>An error occured</p>
      }
    </div>
  )
}

export default page
