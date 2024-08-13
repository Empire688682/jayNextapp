import nodemailer from 'nodemailer';
import { UserModel } from '@/models/userModel';
import bcrypt from 'bcryptjs';

export default async function sendEmail({ email, password, emailType, userId }) {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 2000000
            });
        } else if (emailType === "RESET") {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 2000000
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });

        const mailResponse = await transport.sendMail({
            from: 'Asehindej@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifytoken?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.</p>`
        });

        return mailResponse;

    } catch (error) {
        console.log("Error:", error.message);
    }
}
