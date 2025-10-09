const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your.email@gmail.com',
    pass: 'your_gmail_app_password'
  }
});

async function sendEmailNotification(to, subject, htmlContent) {
  const mailOptions = {
    from: 'your.email@gmail.com',
    to,
    subject,
    html: htmlContent
  };
  
  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmailNotification };
