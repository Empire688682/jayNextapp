import { connectDb } from "@/dbConfig/dbConfig";
import { UserModel } from "@/models/userModel";
import dotenv from 'dotenv';
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

connectDb()

const loginUser = async (req) =>{
    const {email, password} = await req.json();
    try {
        if(!email || !password){
            return new NextResponse(JSON.stringify({success:false, message:"fill the empty input"}), {status:500})
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return new NextResponse(JSON.stringify({success:false, message:"User not found"}), {status:400})
        };
    
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return new NextResponse(JSON.stringify({success:false, message:"Incorrect password"}), {status:400})
        }

        const token = jwt.sign({id : user._id}, process.env.TOKEN_KEY)
        const res = NextResponse.json({success:true, token, message:"Login successful"});
        res.cookies.set("token", token, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            maxAge:2*24*60*60,
            path:"/",
        });
        return res
    } catch (error) {
        console.log("Server error:", error);
        return new NextResponse(JSON.stringify({success:false, message:"An error occured"}), {status:500})
    }
}

export async function POST(req) {
    return loginUser(req)
}