
import {Schema} from "mongoose";
import { model } from "mongoose" ;
import { jobmodel } from "./postmodel.js";


const userSchema=new Schema({

    Email:{type:String},
    Password:{type:String},
    Address:{type:String},
    Role:{type:String,enum:["Jobseeker","Employer"],}

    },
    {
    discriminatorKey:"Role",
    timestamps:true
    });

const usermodel=model('usersignin',userSchema);



const jobseekerSchema=new Schema({

    Name:{type:String},

    PhoneNumber:{type:Number},
    
    Photo:{type:String},
    
    Age:{type:Number},
    
    Gender: {type:String, enum:["Male", "Female"] },
    
    About:{type:String},

    Higher_Qualification:{type:String},
    
    Education:{type:Array},
    
    Experience: {type:Array},
    
    Skills: {type:String},
    
    Resume:{type:String},

    Languages:{type:String}
    

},{ _id: false })

const Jobseeker = usermodel.discriminator('Jobseeker', jobseekerSchema);



const employerSchema = new Schema({

    CompanyName: {type:String},

    Photo:{type:String},

    AboutCompany: {type:String},

    Location: {type:String},

    TotalJobs: {type:String},

    Since:{type:String},

    Photo:{type:String}
    
  });

  // Middleware: Delete jobs when an employer is deleted

  employerSchema.pre("findOneAndDelete", async function (next) {

    try{

        const employer = await this.model.findOne(this.getFilter()); 

        if (employer) {

            await jobmodel.deleteMany({ PostedBy: employer._id });
            console.log("Deleted jobs posted by employer:", employer._id);

        }

    }

    catch (error) {
        console.error("Error deleting jobs of employer:", error);
    }


    next();

});
  
  const Employer = usermodel.discriminator('Employer', employerSchema);
  



export {usermodel,Jobseeker,Employer}