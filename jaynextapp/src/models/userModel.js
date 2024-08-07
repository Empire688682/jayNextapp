import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
         required:true("Username required")
        },
    email:{
        type:String, 
        required:true("Email required")
    },
    password:{
        type:String,
         required:true("Password required")
        },
    isVerifiled:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
});

export const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

