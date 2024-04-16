// models/PasswordReset.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class PasswordReset {
  static async createResetToken(email, token,expiresIn) {
    return prisma.PasswordReset.create({
      data: {
        email,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + expiresIn),
      },
    });
  }

  static async findResetToken(token) {
    return prisma.PasswordReset.findFirst({
      where: {
        token,
      },
    });
  }

  static async deleteResetToken(email) {
    return prisma.PasswordReset.delete({
      where: {
        email,
      },
    });
  }
}

