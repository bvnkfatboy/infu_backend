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
          create: {
            nickname,
            img_profile
          }
        },
        provider,
        socialId
      }
    });

    const token = jwt.sign(
      { id: newUser.id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password, ...userInfo } = newUser;

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age
      })
      .status(201)
      .json(userInfo);
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

