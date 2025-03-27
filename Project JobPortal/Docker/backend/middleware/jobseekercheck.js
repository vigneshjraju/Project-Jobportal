import { usermodel } from "../Model/model.js";

const jobseekercheck=async(req,res,next)=>{

    try{
        const userId = req.userid ? req.userid : req.body.userId;
        
        const user = await usermodel.findById(userId);
        console.log(user);
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (user.Role !== "Jobseeker") {
            return res.status(403).json({ message: "Access denied. Only Employers are allowed are allowed." });
        }

        
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}; 

export {jobseekercheck}


