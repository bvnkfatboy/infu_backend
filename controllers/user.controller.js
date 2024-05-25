import prisma from "../lib/prisma.js";

export const edit = async (req, res) => {
  const {
    email,
    name,
    image,
    bio,
    nickname,
    profilename,
    birthday,
    weight,
    height,
    gender,
    age,
    nation,
    telephone,
    lgbt,
  } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name,
        image,
        profile: {
          update: {
            bio,
            nickname,
            profilename,
            birthday,
            weight,
            height,
            gender,
            age,
            nation,
            telephone,
            lgbt,
          },
        },
      },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const profile = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};
