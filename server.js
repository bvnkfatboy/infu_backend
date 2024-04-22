
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import authRoute from './routes/auth.route.js';
import resetpasswordRoute from "./routes/resetpassword.route.js";
import socialRoute from "./routes/social.route.js";

// const {initChat} = require('./controllers/chat.controller.js');

import { initChat } from "./controllers/chat.controller.js";

// เรียกใช้ dotenv
import 'dotenv/config'
// กําหนดตัวแปร corsOption ที่ใช้ในการจัดการ CORS
const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
}

const app = express(); //เป็นวิธีการใช้ middleware ใน Express.js เพื่อประมวลผล request ก่อนส่งต่อไปยัง route handler
app.use(cors(corsOption)); //เป็น middleware ที่ใช้ในการจัดการ CORS โดยใช้ค่าที่กำหนดใน corsOption
app.use(express.json()); // เป็น middleware ที่ใช้ในการแปลงข้อมูล JSON จาก request body
app.use(express.urlencoded({ // เป็น middleware ที่ใช้ในการแปลงข้อมูล URL-encoded จาก request body
    extended: true
}));
app.use(cookieParser()); // เป็น middleware ที่ใช้ในการจัดการ cookie


app.use("/api/auth", authRoute);
app.use("/api/reset-password", resetpasswordRoute);
app.use("/api/auth/social",socialRoute);

// สร้าง Server 
const Server = http.createServer(app);
const PORT = process.env.PORT || 8000;
Server.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

initChat(Server);
