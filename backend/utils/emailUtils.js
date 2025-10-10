const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // example using Gmail
  auth: {
    user: process.env.EMAIL_USER, // your email in env vars
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmailNotification(to, subject, text) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmailNotification };
