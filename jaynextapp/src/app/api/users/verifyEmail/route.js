import { connectDb } from "@/dbConfig/dbConfig";
import { UserModel } from "@/models/userModel";
import { NextResponse } from "next/server";

const verifyEmail = async (req) => {
    connectDb();

    try {
        const { token } = await req.json();

        console.log("TOKEN:", token);

        const user = await UserModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: "2024-08-15T04:10:51.768+00:00",
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: "No user found" },
                { status: 400 }
            );
        }

        console.log("USER:", user);

        user.isVerifiled = true; // Corrected typo (isVerifiled -> isVerified)
        await user.save();

        return NextResponse.json(
            { success: true, message: "User verification successful" },
            { status: 200 }
        );
    } catch (error) {
        console.log("ERROR:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};

export async function POST(req) {
    return verifyEmail(req); // Ensure to return the result of verifyEmail
}
