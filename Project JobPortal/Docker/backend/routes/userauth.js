import { Router } from "express";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { upload } from "../middleware/upload.js";
import {Jobseeker,Employer,usermodel} from "../Model/model.js";


const user=Router();
dotenv.config()

const converttobase64=(buffer)=>{
    return buffer.toString("base64")
}


user.post('/signup',async(req,res)=>{

    try{
    
            const{email,password,confirmpassword,address,userrole}=req.body;

            if (!email || !password || !confirmpassword || !userrole){
                res.status(400).send('Email, password,  confirm password and userrole are required.');
            }

            else{
                    
                    
                const sign=await usermodel.findOne({Email:email});

                    if(password==confirmpassword){

                        const newpassword=await bcrypt.hash(password,10)
                        
                        
                        if(sign){

                            res.status(400).send('User already exists.');

                        }
                        else{
                           

                            let newUser;
                                if (userrole === 'Jobseeker') {
                                        newUser = new Jobseeker({
                                            Email: email,
                                            Password: newpassword,
                                            Address: address,
                                            Role: userrole
                                    });
                                   
                                    
                                } 
                                else if (userrole === 'Employer') {
                                        newUser = new Employer({
                                            Email: email,
                                            Password: newpassword,
                                            Address: address,
                                            Role: userrole
                                    });
                                   
                                    

                                } 
                                else {
                                     res.status(400).send('Invalid user role.');
                                }

                            console.log(newUser);
                            await newUser.save();
                             
                            res.status(201).json({ message: "User registered successfully", userId: newUser._id,role: newUser.Role});
                            
                        }


                    }
       
        
                    else{
                        res.status(400).send('Please type the same password in confirm password.')
                    }
                }

        }

        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error.");
        }


})



user.patch("/signup/details/:userId",upload.fields([{name:"photo",maxCount:1},{name:"resume",maxCount:1}]),
 async (req, res) => {
    try {
        const { userId } = req.params;
        const { languages,higherqualification,name,phonenumber, age, gender, about, education, experience, skills, companyname, aboutcompany,location,totaljobs,since } = req.body;

        
        let user1 = await usermodel.findById(userId);
        if (!user1) {
            return res.status(404).json({ message: "User not found" });
        }
  
        
        if (user1.Role === "Jobseeker") {

            let image1=null;
            let file1=null;

            if(req.files && req.files["photo"]){
                image1=converttobase64(req.files["photo"][0].buffer)
            }
            if(req.files && req.files["resume"]){
                file1=converttobase64(req.files["resume"][0].buffer)
            }

            await Jobseeker.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        Name:name,
                        PhoneNumber: phonenumber,
                        Age: age,
                        Gender: gender,
                        About: about,
                        Education: education, 
                        Experience: experience,
                        Skills: skills,
                        Languages:languages,
                        Higher_Qualification:higherqualification,
                        Photo:image1,
                        Resume:file1
                        
                    }
                },
                { new: true }  
            );
            res.status(200).json({ message: "Jobseeker details updated successfully" });
        } 
        
        else if (user1.Role === "Employer") {

            let image1=null;
            

            if(req.files && req.files["photo"]){
                image1=converttobase64(req.files["photo"][0].buffer)
            }


            await Employer.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        CompanyName: companyname,
                        AboutCompany: aboutcompany,
                        Location: location,
                        TotalJobs: totaljobs,
                        Location: location,
                        Since:since,
                        Photo:image1
                    }
                },
                { new: true }
            );
            res.status(200).json({ message: "Employer details updated successfully" });
        }
  

  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
  });



  user.post("/login",async(req,res)=>{

    try{

        const {email,password}=req.body;

        
    let user = await Jobseeker.findOne({ Email: email });
    let role = "Jobseeker"; // Initialize role here

    if (!user) {
      user= await Employer.findOne({ Email: email });
      role = "Employer"; // Assign role only if employer is found
    }

    if (!user) {
       res.status(404).json({ message: "User not found. Please sign up." });
    }

    
    const passwordmatch = await bcrypt.compare(password, user.Password);
    if (!passwordmatch) {
       res.status(400).json({ message: "Invalid credentials" });
    }
    else{
        
        const token = jwt.sign({ userId: user._id, role: user.Role },process.env.SECRET_KEY,{ expiresIn: "7d" });

        res.cookie('authToken',token,
            {
                 httpOnly:true
            });

                // Store in role-specific cookie
                // if (role === "Jobseeker") {
                //     res.cookie("jobseekerToken", token, { httpOnly: true });
                // } else {
                //     res.cookie("employerToken", token, { httpOnly: true });
                // }
        

    
    res.status(200).json({message: "Login successful",userId: user._id, role: user.Role, token: token,});
    console.log(token);
    }
    

    }

    catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }


  })
  
  

export {user}