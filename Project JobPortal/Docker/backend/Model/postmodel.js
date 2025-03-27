
import {Schema} from "mongoose";
import { model } from "mongoose";


const jobschema=new Schema({
    
    JobTitle:{type:String,},
    JobType:{type:String,},
    Location:{type:String,},
    GenderPreference:{type:String},
    Qualification:{type:String},
    Salary:{type:String},
    EndDate:{type:String},
    JobDescription: { type: String },
    Responsibilities: { type: String },
    Requirements: { type: String },
    PostedBy: { type:Schema.Types.ObjectId, ref: "usersignin", required: true }, 
    Applicants: [{ type:Schema.Types.ObjectId, ref: "usersignin", required: true }] 

    },
    {
    timestamps:true
    });

const jobmodel=model('Jobs',jobschema);

export {jobmodel}