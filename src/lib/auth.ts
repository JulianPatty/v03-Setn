import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import { emailOTP } from "better-auth/plugins"
import { sendOTPEmail } from "./email";

 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            scope: [
                "openid",
                "email", 
                "profile",
                // Add additional scopes here, for example:
                // "https://www.googleapis.com/auth/drive.file",
                // "https://www.googleapis.com/auth/calendar",
                // "https://www.googleapis.com/auth/gmail.readonly",
            ],
        }, 
    },
    plugins: [
        emailOTP({ 
            async sendVerificationOTP({ email, otp, type }) { 
                await sendOTPEmail(email, otp, type);
            }, 
        }) 
    ]
});
