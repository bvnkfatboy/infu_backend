import express from "express";

import { edit, profile } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/profile", profile);
router.post("/edit", edit);
export default router;
