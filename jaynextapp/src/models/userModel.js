import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
         required:[true,"Username required"],
         unique:true
        },
    email:{
        type:String, 
        required:[true,"Email required"],
        unique:true
    },
    password:{
        type:String,
         required:[true,"Password required"]
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
}, {minimize:true});

export const UserModel = mongoose.models.Users || mongoose.model("Users", userSchema);

