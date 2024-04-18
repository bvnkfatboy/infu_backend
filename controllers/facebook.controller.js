import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const facebookLogin = async (req, res) => {
  const { facebookId, nickname, email, img_profile, provider } = req.body;
  const age = 1000 * 60 * 60 * 24 * 7;

    try {
        const hashedPassword = await bcrypt.hash(facebookId, 10);
        const newUser = await prisma.user.create({
            data: {
            email,
            password: hashedPassword,
            profile: {
                nickname: nickname,
                img_profile: img_profile,
            },
            provider:provider,
            facebookId: facebookId,
            },
        });
        const token = jwt.sign(
            {
            id: newUser.id,
            isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );
      const { password, ...userInfo } = newUser;
      res
        .cookie("token", token, {
          httpOnly: true,
          // secure:true,
          maxAge: age,
        })
        .status(201)
        .json(newUser);
    }catch(err){
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });

    }
};

export const findFacebookUser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await prisma.user.findFirst({
            where: { facebookId: id },
        });
        if (!user) {
            return res.status(200).json(null);
        }
        res.status(200).json(user);
        console.log(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to find user!" });
    }
}



export const facebookDelete = async (req, res) => {
  const { facebookId } = req.body;

  try {
    const user = await prisma.user.delete({
      where: { facebookId }
    });

    res.status(200).json({ message: "Delete successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete!" });
  }
};


