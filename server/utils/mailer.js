import nodemailer from "nodemailer";

export async function sendOtpEmail(to, code) {
  if (!process.env.SMTP_HOST) {
    console.log(`Admin OTP for ${to}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: "Your portfolio admin OTP",
    text: `Your admin login OTP is ${code}. It expires in 10 minutes.`,
  });
}
