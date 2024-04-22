import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const socialSignup = async ({ body: { socialId, nickname, email, img_profile, provider } }, res) => {
  const age = 1000 * 60 * 60 * 24 * 7;
  try {
    const hashedPassword = await bcrypt.hash(socialId, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        profile: {
            nickname,
            img_profile
        },
        provider,
        socialId
      }
    });
        console.log(newUser);
        res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to signup!" });
  }
};
export const findSocialUser = async ({ body: { email } }, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    res.status(user ? 200 : 204).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to find user!" });
  }
};

export const socialDelete = async ({ body: { socialId } }, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { socialId },
      select: { id: true }
    });

    if (user) {
      await prisma.user.delete({
        where: { id: user.id }
      });

      res.status(200).json({ message: "Delete successfully!" });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete!" });
  }
};

export const findSocialUserID = async ({ body: { email } }, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      res.status(200).json({ userId: user.id });
    } else {
      res.status(204).json({ message: "User not found!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to find user!" });
  }
};

