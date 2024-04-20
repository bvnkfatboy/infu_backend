import express from "express";
import { socialSignup,findSocialUser } from "../controllers/social.controller.js";

const router = express.Router();

router.post('/create',socialSignup)
router.post('/find',findSocialUser)

export default router;