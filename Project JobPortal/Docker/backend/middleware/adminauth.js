import jwt from "jsonwebtoken";

const adminauth=(req, res, next)=>{

    const admincookie=req.headers.cookie;
    console.log(admincookie);

    if(!admincookie){

        console.log("Please login to continue.");
        res.status(401).send("Please login to continue.")

    }
    else{

        const [name,Token]=admincookie.trim().split('=');
        console.log(name);
        console.log(Token);

        if(name=="adminToken"){
            
            const verified=jwt.verify(Token,process.env.SECRET_KEY)
            console.log(verified);

            req.userid=verified.adminId; 
            req.userrole=verified.role;

            next();

        }
        else{
            res.status(401).json({ message: "Unauthorized Access" });
        }
    }


}

export {adminauth}