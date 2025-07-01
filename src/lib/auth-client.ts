import { createAuthClient } from "better-auth/client"
import { emailOTPClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        emailOTPClient()
    ]
})

// Standard Google sign-in
export const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
    return data
}

// Request additional Google scopes (e.g., Google Drive access)
export const requestGoogleDriveAccess = async () => {
    await authClient.linkSocial({
        provider: "google",
        scopes: ["https://www.googleapis.com/auth/drive.file"],
    })
}

// Example of requesting multiple additional scopes
export const requestAdditionalGoogleScopes = async (scopes: string[]) => {
    await authClient.linkSocial({
        provider: "google",
        scopes,
    })
}

// Email OTP functions
export const sendOTP = async (email: string, type: "sign-in" | "email-verification" | "forget-password" = "sign-in") => {
    const { data, error } = await authClient.emailOtp.sendVerificationOtp({
        email,
        type
    })
    return { data, error }
}

export const signInWithOTP = async (email: string, otp: string) => {
    const { data, error } = await authClient.signIn.emailOtp({
        email,
        otp
    })
    return { data, error }
}