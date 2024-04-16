import express from "express";
import { login, logout, register} from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

// router.post('/requestreset',requestPasswordReset)
// router.post('/resetpassword/:token',resetPassword)
export default router;