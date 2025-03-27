import { Schema } from "mongoose";
import { model } from "mongoose";

const adminschema=new Schema({

    Name: { type: String},
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String}


})

const adminmodel=model("Admin",adminschema);

export  {adminmodel}