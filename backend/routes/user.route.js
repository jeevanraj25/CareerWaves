import express from "express";
import { register, login, logout, updateProfile } from "../controllers/user.js";
import isAuth from "../middlewares/isAuth.js";
import { singleUpload } from "../middlewares/Multer.js";

const router =express.Router();

router.post("/register",singleUpload,register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuth,singleUpload,updateProfile);


export default router;