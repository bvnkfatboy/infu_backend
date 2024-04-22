import express from "express";
import { socialSignup,findSocialUser,findSocialUserID} from "../controllers/social.controller.js";

const router = express.Router();

router.post('/create',socialSignup)
router.post('/find',findSocialUser)
router.post('/findID',findSocialUserID)

export default router;