import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectDb = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        if (response) {
            console.log("DB connected");
        }
    } catch (error) {
        console.log("DB connection error:", error);
    }
}

export { connectDb }