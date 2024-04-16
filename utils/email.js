import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "theerapong.bvnk@gmail.com",
      pass: "lkmr hhgr nysp rkuu",
    },
});

export const sendResetEmail = async (email, token) => {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: 'theerapong.bvnk@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://localhost:8000/api/reset-password/reset?token=${token}`,
      html: `<p>Click the following link to reset your password: <a href="http://localhost:8000/api/reset-password/reset?token=${token}">Reset Password</a></p>`,
    });

    console.log('Reset email sent successfully');
  } catch (err) {
    console.error('Error sending reset email:', err);
  }
};