import React from 'react'
import { useEffect, useState } from "react";
import { bodyimg} from '../images/index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import ENav from '../components/ENav.jsx';

const Edashboard = () => {

        const [profilePic, setProfilePic] = useState("images/Photo.jpeg"); // Default image
    
    
        useEffect(() => {
            const fetchProfilePic = async () => {
                try {
                    const token = localStorage.getItem("authtoken");
    
                    const response = await fetch('/api/employer/dashboard', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`, // Send authtoken
                            "Content-Type": "application/json",
                        },
                    });
                    
                    const data = await response.json();
                    console.log(data);
                    
                    
                    if (data.Photo) {
                        setProfilePic(`data:image/jpeg;base64,${data.Photo}`); // Set the fetched profile picture
                    }
                } catch (error) {
                    console.error("Error fetching profile picture:", error);
                }
            };
    
            fetchProfilePic();
        }, []);



  return (
    
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-center bg-cover dark:bg-gray-900">

                <ENav/>
            

            

                <div className="w-full px-4 sm:w-[1000px] sm:mx-auto lg:ml-[410px] mt-[150px] sm:mt-[250px] lg:mt-[350px]">

                    <p className="font-bold text-2xl sm:text-3xl text-center">
                        <span className="text-red-700 font-extrabold font-mono text-4xl sm:text-5xl">
                            Find the Perfect Talent for Your Business
                        </span>
                    </p>

                    <br />

                    <p className="font-bold text-3xl sm:text-3xl text-center font-sans">Connect, Hire, Grow.</p>
                    
                    <br />

                    <p className="font-bold text-sm sm:text-sm text-center">
                       Discover exceptional candidates to shape your company's success. Explore a vast pool of talent and take your team to the next level.
                    </p>

                </div>
                
                <br />

                <div className="flex justify-center mt-6">
                    <Link to="/jobpost">
                        <button className="w-52 bg-red-700 hover:bg-green-700 rounded-3xl text-3xl font-bold border-2 border-black">
                            Post a Job
                        </button>
                    </Link>
                </div>
                
            



            <Footer/>

    </div>
  )
}

export default Edashboard