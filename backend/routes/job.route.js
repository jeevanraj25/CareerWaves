import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { getAdminJobs, getAllJobs, getJobById, PostJob } from "../controllers/job.js";

const router =express.Router();

router.post("/post", isAuth,PostJob);
router.get("/get",getAllJobs);
router.get("/get/:id", isAuth,getJobById );
router.get("/getadmin", isAuth,getAdminJobs);


export default router;
