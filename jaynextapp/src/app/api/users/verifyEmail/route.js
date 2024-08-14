import { connectDb } from "@/dbConfig/dbConfig";
import { UserModel } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const sendEmail = async (req) =>{
    connectDb();
    try {
        const {token} = await req.json()
    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json({success:false, message:"ERROR"}, {status:500})
    }
}