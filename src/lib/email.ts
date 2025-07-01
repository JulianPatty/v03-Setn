import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email: string, otp: string, type: string) {
  try {
    const subject = type === 'sign-in' 
      ? 'Your sign-in code' 
      : type === 'email-verification'
      ? 'Verify your email'
      : 'Reset your password';

    const { data, error } = await resend.emails.send({
      from: 'Your App <noreply@yourapp.com>', // Update with your verified domain
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>${subject}</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This code will expire in 5 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    });

    if (error) {
      console.error('Failed to send email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}