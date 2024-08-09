import { NextResponse } from "next/server";


const logoutUser = async () =>{
    try {
        const res = NextResponse.json({success:true, message:"Logout successful"});
        res.cookies.set("token", "", {
            httpOnly:true,
            expires: Date.now()
        });
        return res
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({success:false, message:"unable to log out"}))
    }
}

export async function GET() {
    return logoutUser()
}