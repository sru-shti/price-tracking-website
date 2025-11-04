import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Reusable function to send an email
export const sendEmail = async (to, subject, message) => {
  const mailOptions = {
    from: `"Price Tracker" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};


module.exports = { sendEmailNotification };
