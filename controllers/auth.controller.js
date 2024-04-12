
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    const { email, password,fullname,role } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        //db operation

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullname,
                role,
            },
        });

        console.log(newUser);
        res.status(201).json({ message: "User created successfully!" });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" });
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try{

        const user = await prisma.user.findUnique({
        where: { email },
        });

    
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid password!" });
        }

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign(
          {
            id: user.id,
            isAdmin: false,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: age }
        );
    
        const { password: userPassword, ...userInfo } = user;
    
        res
          .cookie("token", token, {
            httpOnly: true,
            // secure:true,
            maxAge: age,
          })
          .status(200)
          .json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
}
export const logout = async(req, res) => {
    //db operation
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
}

