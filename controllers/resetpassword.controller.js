
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import PasswordReset from '../models/PasswordReset.js';
import { sendResetEmail } from '../utils/email.js';


export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    const expiresIn = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
  
      // Generate a random token
      const token = bcrypt.hashSync(email+Date.now(), 10);
  
      // Save the token in the database
      await PasswordReset.createResetToken(email, token, expiresIn); // ตรวจสอบการเรียกใช้ createResetToken ว่าถูกต้องหรือไม่
  
      // Send the reset link to the user's email
      await sendResetEmail(email, token); // ตรวจสอบว่า sendResetEmail ถูกเรียกใช้งานได้อย่างถูกต้องหรือไม่
  
      res.status(200).json({ message: 'Reset link sent successfully!' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to request password reset!' });
    }
  };

  export const resetPassword = async (req, res) => {
    const token = req.query.token;
    const { newPassword } = req.body;
    try {
      // Find the token in the database
      const resetToken = await PasswordReset.findResetToken(token);
  
      if (!resetToken || resetToken.expiresAt < new Date()) {
        if (resetToken) {
            await PasswordReset.deleteResetToken(resetToken.email);
          }
        return res.status(404).json({ message: 'Invalid or expired reset token!' });
      }

    //   res.send('Token: ' + token);
    //   res.send('email: ' + resetToken.email);
  
    //   Update the user's password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          email: resetToken.email,
        },
        data: {
          password: hashedPassword,
        },
      });
  
      // Delete the reset token from the database
      await PasswordReset.deleteResetToken(resetToken.email);
      res.status(200).json({ message: 'Password reset successfully!' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to reset password!' });
    }

  };

