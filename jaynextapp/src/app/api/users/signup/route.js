import { UserModel } from "@/models/userModel.js";
import { connectDb } from "@/dbConfig/dbConfig.js";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import validator from "validator";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendEmail from "@/helpers/mailer";

dotenv.config();

export const registerUser = async (req) => {
    connectDb();
    try {
        const { username, email, password } = await req.json();
        const user = await UserModel.findOne({ email });

        // Checking empty input
        if (!username || !email || !password) {
            return NextResponse.json({ success: false, message: "All fields required" }, { status: 400 });
        }

        // Checking if user exists
        if (user) {
            return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
        }

        // Checking if email is valid
        if (!validator.isEmail(email)) {
            return NextResponse.json({ success: false, message: "Invalid email address" }, { status: 400 });
        }

        // Checking password strength
        if (password.length <= 8) {
            return NextResponse.json({ success: false, message: "Password too short" }, { status: 400 });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        sendEmail({
            userId:newUser._id,
            email,
            emailType:"VERIFY"
        });

        await newUser.save();


        // Generating token
        const token = jwt.sign({userId:newUser._id}, process.env.TOKEN_KEY, { expiresIn: "2h" });

        // Creating a response with a cookie
        const res = NextResponse.json({ success: true, token, message: "User added successfully" }, { status: 200 });
        res.cookies.set("token", token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 2 * 24 * 60 * 60,
            sameSite: "lax"
            
        });
        

        return res;

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    return registerUser(req);
}
