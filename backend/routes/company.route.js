import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { GetCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.js";
import { singleUpload } from "../middlewares/Multer.js";

const router =express.Router();

router.post("/register", isAuth,registerCompany);
router.get("/get", isAuth,GetCompany);
router.get("/get/:id",isAuth,getCompanyById );
router.put("/update/:id", isAuth,singleUpload,updateCompany);


export default router;