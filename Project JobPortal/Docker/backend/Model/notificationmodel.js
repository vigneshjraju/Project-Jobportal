import { Schema } from "mongoose";
import { model } from "mongoose";

const notificationschema=new Schema({

    JobseekerID:{ type: Schema.Types.ObjectId, ref: "usersignin", required: true },
    JobID:{ type: Schema.Types.ObjectId, ref: "Jobs", required: true },
    EmployerID:{ type: Schema.Types.ObjectId, ref: "usersignin", required: true },
    Status: { type: String, enum: ["Shortlisted", "Pending", "Rejected"], required: true },
    
})

const notificationmodel=model("Notification",notificationschema)

export {notificationmodel}