import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { jobmodel } from "../Model/postmodel.js";
import { jobseekercheck } from "../middleware/jobseekercheck.js";
import { notificationmodel } from "../Model/notificationmodel.js";
import { usermodel } from "../Model/model.js";
import { Jobseeker } from "../Model/model.js";
import { upload } from "../middleware/upload.js";



const converttobase64=(buffer)=>{
    return buffer.toString("base64")
}

const jobseeker=Router();

jobseeker.get("/getJobDetails", authenticate, async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const job = await jobmodel.findById(jobId).populate("PostedBy", "CompanyName Photo");;

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ job });
        
    } catch (error) {
        console.error("Error fetching job details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


jobseeker.post("/apply",authenticate,jobseekercheck,async(req,res)=>{

    try {
        const jobId = req.query.jobId;
        const jobseekerId = req.userid; 

        
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        
        if (job.Applicants.includes(jobseekerId)) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        
        job.Applicants.push(jobseekerId);
        await job.save();

        res.status(200).json({ message: "Job application submitted successfully" });

    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

jobseeker.get("/viewjobs",authenticate,jobseekercheck,async(req,res)=>{

    try {
        const jobs = await jobmodel.find().populate("PostedBy", "CompanyName Photo"); 

        res.status(200).json({message: "Jobs retrieved successfully",jobs});

    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


})

jobseeker.get("/jobseeker/notifications",authenticate,async(req, res)=>{

    try {
        const seekerId = req.userid? req.userid:req.body.userid; 

        
        const notifications = await notificationmodel.find({ JobseekerID:seekerId }).populate({
            path: "JobID",
            select: "JobTitle PostedBy", // Get JobTitle & EmployerID
            populate: { path: "PostedBy", select: "CompanyName" } // Get companyname from usersignin
        });
 
        if(notifications){
            
        res.status(200).json({ message: "Notifications retrieved successfully", notifications});
        console.log(notifications);
        

        }
        else{
            res.status(400).json({ message: "userid validation failed",notifications: []});
        }


    } 
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

jobseeker.get('/jobseeker/logout', (req, res) => {

    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout Successfully." });
});


jobseeker.get('/jobseeker/dashboard',authenticate,async(req,res)=>{

    try{
        const jobseekerId = req.userid? req.userid:req.body.userid;

        const user=await usermodel.findById(jobseekerId);
        
        

        if(!user){
            res.status(404).json({ message: "User not found" });
        }
        else{
            res.json({ Photo: user.Photo }); // Returning "Photo" as per model
        }

    }
    catch(error){
        res.status(500).json({ message: "Error fetching user details", error });
    }

})

jobseeker.get('/jobseeker/profile', authenticate, async (req, res) => {
    try {
        const jobseekerId = req.userid || req.body.userid;
        
        if (!jobseekerId) {
            return res.status(400).json({ message: "User ID not found in request" });
        }

        const user = await usermodel.findById(jobseekerId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

            // Convert the Education string into an object
            let educationData = [];
            if (user.Education && user.Education.length > 0) {
                const educationString = user.Education[0]; // Get the first education entry (as a string)
                
                // Extract values using regex or split method
                const educationObject = {};
                const regex = /Qualification:\s(.*?),\sCollege:\s(.*?),\sUniversity:\s(.*?),\sGrade:\s(.*)/;
                const match = educationString.match(regex);
                
                if (match) {
                    educationObject.Qualification = match[1].trim();
                    educationObject.College = match[2].trim();
                    educationObject.University = match[3].trim();
                    educationObject.Grade = match[4].trim();
                    
                    educationData.push(educationObject);
                }
            }

                    // Convert Experience String into Object
                let experienceData = [];
                if (user.Experience && user.Experience.length > 0) {
                    const experienceString = user.Experience[0]; // Get the first experience entry as a string
                    const experienceObject = {};
                    const expRegex = /Job Title:\s(.*?),\sCompany:\s(.*?),\sDetails:\s(.*?),\sYears:\s(.*)/;
                    const expMatch = experienceString.match(expRegex);

                    if (expMatch) {
                        experienceObject.JobTitle = expMatch[1].trim();
                        experienceObject.Company = expMatch[2].trim();
                        experienceObject.Details = expMatch[3].trim();
                        experienceObject.Years = expMatch[4].trim();

                        experienceData.push(experienceObject);
                    }
                }


        res.json({ 

            name: user.Name,
            about:user.About,
            phone: user.PhoneNumber,
            age: user.Age,
            gender: user.Gender,
            photo: user.Photo,
            higher:user.Higher_Qualification,
            education: educationData, 
            experience: experienceData,
            skills: user.Skills,
            higherqualification: user.Higher_Qualification,
            languages: user.Languages
            
            

        });

        
        

    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
});

jobseeker.patch("/jobseeker/edit",authenticate, upload.fields([{ name: "photo", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
    async (req, res) => {
        try {
            const  userId  = req.userid? req.userid:req.body.userid;
            const { languages,higherqualification,name,phonenumber, age, gender, about, education, experience, skills} = req.body;
            
                    
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

        }catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
);


export {jobseeker}