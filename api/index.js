import  express  from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import pnrRoute from './routes/pnrRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();

const url=process.env.MONGO;
mongoose.connect(url).then(()=>{
    console.log("connected to data base");
})
.catch((err)=>{
    console.log(err);
})


const app=express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000,()=>{
    console.log("App is listening on port 3000");
})

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/pnr",pnrRoute);

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});
