import { Router } from "express";
import authenticate from "../middleware/authentication.js";
import { employercheck } from "../middleware/employercheck.js";
import { usermodel } from "../Model/model.js";
import { jobmodel } from "../Model/postmodel.js";
import { notificationmodel } from "../Model/notificationmodel.js";
import { Employer } from "../Model/model.js";
import { upload } from "../middleware/upload.js";


const converttobase64=(buffer)=>{
    return buffer.toString("base64")
}

const employer=Router()

employer.post("/postjob",authenticate,employercheck,async(req,res)=>{

try{
    const {jobtitle,location,jobtype,genderpreferenece,qualification,jobdescription,responsibilities,requirements,salary,enddate}=req.body;

    const userId = req.userid ? req.userid : req.body.userId;


    const newJob = new jobmodel({

        JobTitle:jobtitle,
        JobType:jobtype,
        Location:location,
        GenderPreference:genderpreferenece,
        Qualification:qualification,
        Salary:salary,
        JobDescription: jobdescription,
        Responsibilities: responsibilities,
        Requirements: requirements,
        EndDate:enddate,
        PostedBy:userId
        
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });

} 
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
}
    
})


employer.get("/job/:jobId", authenticate, employercheck, async (req, res) => {
    try {
        const userId = req.userid; // Extract authenticated employer ID
        const jobId = req.params.jobId; // Extract jobId from URL

        console.log("Fetching job:", jobId, "for employer:", userId); // Debugging

        const latestJob = await jobmodel.findOne({ _id: jobId, PostedBy: userId });

        if (!latestJob) {
            return res.status(404).json({ message: "No jobs found" });
        }

        res.json(latestJob);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


employer.patch("/editjob/:jobId",authenticate,async (req, res) => {
        try {
            const {jobtitle,location,jobtype,genderpreferenece,qualification,jobdescription,responsibilities,requirements,salary,enddate}=req.body;

            const userId = req.userid ? req.userid : req.body.userId;
            const jobId = req.params.jobId; // Extract jobId from URL
            
                    
                    let job1 = await jobmodel.findById(jobId);

                    if (!job1) {
                        return res.status(404).json({ message: "Job not found" });
                    }
              
            
                    else{

                        const job= await jobmodel.findByIdAndUpdate(
                            jobId,
                            {
                                $set: {
                                    JobTitle:jobtitle,
                                    JobType:jobtype,
                                    Location:location,
                                    GenderPreference:genderpreferenece,
                                    Qualification:qualification,
                                    Salary:salary,
                                    JobDescription: jobdescription,
                                    Responsibilities: responsibilities,
                                    Requirements: requirements,
                                    EndDate:enddate,
                                    PostedBy:userId
                                }
                            },
                            { new: true }
                        );
                        res.status(200).json({ message: "Employer details updated successfully", Job: job});
                    }

        }catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
);

employer.get("/employer/viewjobs", authenticate, async (req, res) => {
    try {
        const userId = req.userid; // Employer ID
        const jobs = await jobmodel.find({ PostedBy: userId });

        if (!jobs.length) {
            return res.status(404).json({ message: "No jobs found for this employer" });
        }

        res.json({ jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});







employer.patch("/updatepostjob/:jobId",authenticate,employercheck,async(req,res)=>{

    try{
        const { jobId } = req.params; 

        const{jobdescription,responsibilities,requirements}=req.body;
        
        const job = await jobmodel.findById(jobId);

        if(job){

            job.JobDescription=jobdescription;
            job.Responsibilities=responsibilities;
            job.Requirements=requirements;
        
            await job.save();
            res.status(201).json({ message: "Job udated successfully", job: job });
        }
        else{
            res.status(401).json({ message: "Job not found"})
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

})

employer.get("/appliedcandidates",authenticate,employercheck,async(req,res)=>{

    try {
        const jobId = req.query.jobId;

        
        const job = await jobmodel.findById(jobId).populate("Applicants", "Name Photo Email PhoneNumber Age Education Experience Skills"); 
        

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        
        // Fetch application statuses from notification model
        const notifications = await notificationmodel.find({ JobID: jobId })
            .select("JobseekerID Status"); // Fetch only JobseekerID & Status

        // Create a map of jobseekerID -> status
        const statusMap = {};
        notifications.forEach((notif) => {
            statusMap[notif.JobseekerID.toString()] = notif.Status;
        });

        // Merge status into applicants
        const applicantsWithStatus = job.Applicants.map((applicant) => ({
            ...applicant._doc, // Convert Mongoose document to plain object
            Status: statusMap[applicant._id.toString()] || "Not Updated", // Default if no status
        }));




        res.status(200).json({ message: "Applied candidates retrieved successfully", applicants: applicantsWithStatus});

    } catch (error) {
        console.error("Error fetching applicants:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

employer.get("/candidateprofile/:id", authenticate, employercheck, async (req, res) => {
    try {
        const candidateId = req.params.id;
        const candidate = await usermodel.findById(candidateId).select("-password"); // Exclude password

        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Convert the Education string into an object
        let educationData = [];
        if (candidate.Education && candidate.Education.length > 0) {
            const educationString = candidate.Education[0]; // Get the first education entry (as a string)
            
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
            if (candidate.Experience && candidate.Experience.length > 0) {
                const experienceString = candidate.Experience[0]; // Get the first experience entry as a string
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

                name: candidate.Name,
                about:candidate.About,
                phone: candidate.PhoneNumber,
                age: candidate.Age,
                gender: candidate.Gender,
                photo: candidate.Photo,
                education: educationData, 
                experience: experienceData,
                skills: candidate.Skills,
                higherqualification: candidate.Higher_Qualification,
                languages: candidate.Languages,
                resume: candidate.Resume
                
                
    
            });



    } catch (error) {
        console.error("Error fetching candidate details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});




employer.delete("/deletejob",authenticate,employercheck,async(req,res)=>{


    try {
        const jobId = req.query.jobId;
        const employerId = req.userid;

        
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        
        if (job.PostedBy.toString() !== employerId) {
            return res.status(403).json({ message: "Access denied. You can only delete jobs you posted." });
        }

        
        await jobmodel.findByIdAndDelete(jobId);
        res.status(200).json({ message: "Job deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }



})

employer.post("/employer/updatestatus",authenticate,employercheck,async(req,res)=>{

    try {
        const { jobId, jobseekerId, status } = req.body;
        const employerId = req.userid; 

        
        const job = await jobmodel.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        
        if (job.PostedBy.toString() !== employerId) {
            return res.status(403).json({ message: "You are not authorized to update this job's applicants" });
        }

        
        const notification = new notificationmodel({
            JobseekerID:jobseekerId,
            JobID:jobId,
            EmployerID:employerId,
            Status:status

        });
        console.log(notification);
        
        await notification.save();
        res.status(200).json({ message: `Application status updated to ${status}`, notification: notification });
    
    } 
    catch (error) {
        console.error("Error updating job application status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

employer.get('/employer/logout',(req,res)=>{

    res.clearCookie("authToken");
    res.status(201).json({message:"logout Successfully."})



})

employer.get('/employer/dashboard',authenticate,async(req,res)=>{

    try{
        const employerId = req.userid? req.userid:req.body.userid;

        const user=await usermodel.findById(employerId);
        
        

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

employer.get('/employer/profile', authenticate, async (req, res) => {
    try {
        const employerId = req.userid || req.body.userid;
        
        if (!employerId) {
            return res.status(400).json({ message: "User ID not found in request" });
        }

        const user = await usermodel.findById(employerId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        res.json({ 

            Companyname: user.CompanyName,
            Aboutcompany:user.AboutCompany,
            location: user.Location,
            Totaljobs: user.TotalJobs,
            photo: user.Photo,
            since: user.Since

        });

        // console.log(user.CompanyName,
        //     user.AboutCompany,
        //     user.Location,
        //     user.TotalJobs,
        //     user.Photo,
        //     user.Since);
        

        
        

    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
});

employer.patch("/employer/edit",authenticate, upload.fields([{ name: "photo", maxCount: 1 }]),
    async (req, res) => {
        try {
            const  userId  = req.userid? req.userid:req.body.userid;
            const { companyname, aboutcompany,location,totaljobs,since } = req.body;
            
                    
                    let user1 = await usermodel.findById(userId);

                    if (!user1) {
                        return res.status(404).json({ message: "User not found" });
                    }
              
                    
                    if (user1.Role === "Employer") {

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

        }catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }
);


export {employer}