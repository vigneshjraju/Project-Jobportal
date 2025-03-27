import express, { json } from 'express';
import dotenv from 'dotenv';
import { user } from './routes/userauth.js';
import cors from 'cors';
import mongoose from 'mongoose';
import { employer } from './routes/employerauth.js';
import { jobseeker } from './routes/jobseeker.js';
import { admin } from './routes/admin.js';
// import { sign } from './routes/signupauth.js';

const sphere=express();
dotenv.config();

const PORT=process.env.PORT

sphere.use(cors({ origin: "*", credentials: true }));  // Enable CORS

sphere.use(json())// json() is a middleware 
sphere.use("/",user)
sphere.use("/",employer)
sphere.use("/",jobseeker)
sphere.use("/",admin)
// sphere.use("/",sign)


sphere.listen(PORT,()=>{

    console.log(`Server is listening to the Port ${PORT}`);
    

})

mongoose.connect('mongodb://mongodb:27017/Jobportal').then(()=>{
    console.log("MongoDB connected successfully to Jobportal");
    })
    .catch((error) => {
        console.error("MongoDB failed to connect to Jobportal:", error);
    });