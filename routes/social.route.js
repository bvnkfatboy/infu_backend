import express from "express";
import {facebookLogin,findFacebookUser} from "../controllers/facebook.controller.js";

const router = express.Router();

router.post('/facebook',facebookLogin)
router.post('/facebook/find',findFacebookUser)

export default router;