import { connectDb } from "@/dbConfig/dbConfig";
import { getUserToken } from "@/helpers/getUserToken";
import { NextResponse, NextRequest } from "next/server";
import { UserModel } from "@/models/userModel";

connectDb();

const getUserId = async (req) => {
    try {
        const userId = await getUserToken(req);
        const user = await UserModel.findOne({_id:userId}).select("-password")
        if(!user){
            return new NextResponse(JSON.stringify({success:false, message:"No User found"}), {status:405})
        }
        return new NextResponse(JSON.stringify({success:true, user, message:"User founded"}), {status:200})
    } catch (error) {
        console.log("getUserId", error);
        return new NextResponse.json({success:false, message:"ERROR"})
    }
}

export async function GET(req) {
    return getUserId(req)
    
}