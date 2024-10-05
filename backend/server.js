import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import CompanyRoute from "./routes/company.route.js"
import JobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

dotenv.config({});


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true  // lowercase 'c'
};

app.use(cors(corsOptions));



//api

app.use("/api/user",userRoute);
app.use("/api/company",CompanyRoute)
app.use("/api/job",JobRoute);
app.use("/api/application",applicationRoute);






const PORT =3000 || process.env.PORT ;


app.listen(PORT ,() =>{
    connectDb();
    console.log(`server is running on port ${PORT}`);
})