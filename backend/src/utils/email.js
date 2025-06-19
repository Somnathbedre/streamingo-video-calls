// backend/utils/email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: "Your Streamingo Password Reset OTP",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
}
