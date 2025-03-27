import { Router } from "express";
import bcrypt from "bcrypt";
import { adminmodel } from "../Model/adminmodel.js";
import jwt from "jsonwebtoken";
import { adminauth } from "../middleware/adminauth.js";
import { Employer, usermodel } from "../Model/model.js";


const admin=Router();


admin.post("/admin/signup",async(req,res)=>{

    try{
        const{name,email,password,role}=req.body;

        const exadmin= await adminmodel.findOne({Email:email})

        if(exadmin){
            res.status(400).json({message:"Admin already exists"})
        }

        else{
            const newpassword=await bcrypt.hash(password,10)

            const newadmin=new adminmodel({

                Name:name,
                Email:email,
                Password:newpassword,
                Role:role
            })

            await newadmin.save();
            res.status(201).json({ message: "Admin registered successfully", 
                userId: newadmin._id,  // Include userId
                Newadmin: newadmin  })

        }

    }
    catch (error) {
        console.error("Admin Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }



})

admin.post("/admin/login", async (req,res) => {
    try {
        const { email, password } = req.body;

        
        const admin = await adminmodel.findOne({Email:email});
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        const pass= await bcrypt.compare(password, admin.Password);
        console.log(pass);
        
        if (!pass) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        const Token = jwt.sign({ adminId: admin._id, role: admin.Role },process.env.SECRET_KEY,{ expiresIn: "1h" });

        res.cookie('adminToken',Token,
            {
                 httpOnly:true
            });

        res.status(200).json({ message: "Admin logged in successfully", Token:Token});
    } 
    catch (error) {
        console.error("Admin Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

admin.get("/admin/getemployers",adminauth,async(req, res) => {

    try {

        const employers = await Employer.find({}, "_id Email CompanyName Photo");
        res.status(200).json({ message: "Employers retrieved successfully", employers });
    } 

    catch (error) {
        console.error("Error fetching employers:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    


})

admin.delete("/admin/deleteemployers/:employerId",adminauth,async(req, res) => {

    try {
        const { employerId } = req.params;


        
        const Employer1 = await Employer.findByIdAndDelete(employerId);
        if (!Employer1) {
            return res.status(404).json({ message: "Employer not found" });
        }

        res.status(200).json({ message: "Employer deleted successfully" });
    } 
    catch (error) {
        console.error("Error deleting employer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


})

admin.get('/admin/logout',(req,res)=>{

    res.clearCookie("adminToken");
    res.status(201).json({message:"logout Successfully."})



})

admin.get("/employ/:employId", async (req, res) => {
    try {
        
        const employId = req.params.employId; // Extract jobId from URL

        console.log("Fetching employ:", employId); // Debugging

        const employ = await usermodel.findOne({ _id: employId});

        if (!employ) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.json({Employ:employ});
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});



export {admin}