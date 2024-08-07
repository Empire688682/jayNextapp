import { UserModel } from "@/models/userModel.js";
import { connectDb } from "@/dbConfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import validator from "validator";
import jwt from 'jsonwebtoken'


connectDb();

const createToken = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_KEY);
}

const registerUser = async (req) =>{
    try {
        const {username, email, password} = await req.json();
        const user = await UserModel.findOne({email});

        //checking empty input
        if(!username || !email || !password){
            return new NextResponse(JSON.stringify({success:false, message:"All filed required"}), {status:500})
        }

        //chaecking isUser exist
        if(user){
            return new NextResponse(JSON.stringify({success:false, message:"User already exist"}), {status:500})
        };

        //checking isEmail valid
        if(!validator.isEmail(email)){
            return new NextResponse(JSON.stringify({success:false, message:"Invalid email address"}), {status:500})
        };

        //checking password strength
        if(password.length <= 8){
            return new NextResponse(JSON.stringify({success:false, message:"Password too short"}), {status:500})
        };

        //passwordHash
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await new UserModel({
            username,
            email,
            password:hashedPassword,
        });

        const token = createToken(newUser._id)
        await newUser.save();

        return new NextResponse(JSON.stringify({success:true, token, message:"User added successful"}), {status:200})

    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({success:false, message:"Internal Server Error"}), {status:500})
    }
}

