import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie; //cookie instead of cookies
    console.log(cookie);

    if (!cookie){
     
        console.log("Please login to continue.");
        res.status(401).send("Please login to continue.")
        
    }

    else {

        //     // Convert cookies into an object
        //     const cookieObj = Object.fromEntries(
        //         cookies.split(";").map((cookie) => cookie.trim().split("="))
        //     );

        //     let token = cookieObj["jobseekerToken"] || cookieObj["employerToken"];

        //     if (!token) {
        //         return res.status(401).send("Unauthorized access");
        //     }

        //     try {
        //         const verified = jwt.verify(token, process.env.SECRET_KEY);
        //         console.log(verified);

        //         req.userid = verified.userId;
        //         req.userrole = verified.role;

        //         next();
        //     } catch (error) {
        //         return res.status(401).send("Invalid token");
        //     }
        // };



        
        
        const [name,Token]=cookie.trim().split('=');
        console.log(name);
        console.log(Token);

        if(name=="authToken"){
            const verified=jwt.verify(Token,process.env.SECRET_KEY)
            console.log(verified);

            req.userid=verified.userId; 
            req.userrole=verified.role; 

            next();
        }

        else{
            res.status(401).send("unauthorized Access")
        }

    }

}

export default authenticate


