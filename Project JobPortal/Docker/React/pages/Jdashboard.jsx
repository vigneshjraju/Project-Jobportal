import React from 'react'
import { useEffect, useState } from "react";
import { logo, bodyimg} from '../images/index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import LogoutButton from '../components/Logout.jsx';



const Dashboard = () => {

    const [profilePic, setProfilePic] = useState("images/Photo.jpeg"); // Default image


    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const token = localStorage.getItem("authtoken");

                const response = await fetch('/api/jobseeker/dashboard', {
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
    
        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover  dark:bg-gray-900">
                    
                <div className="flex flex-wrap justify-between px-4 sm:px-0">
                    <div className="w-full sm:w-auto text-center sm:text-left">
                        
                            <img src={logo} className="ml-8 max-w-[120px] sm:max-w-none" alt="logo" />
            
                    </div>
    
                    <nav className="flex flex-wrap gap-8 sm:gap-28 justify-center w-full sm:w-auto mt-8 sm:mt-16">

                        <Link to="/jdashboard" className="text-black hover:text-green-700 text-base sm:text-lg font-bold">Home</Link>
                        <Link to="/findjobs" className="text-black hover:text-green-700 text-base sm:text-lg font-bold">Find Jobs</Link>
                        <Link to="/aboutus" className="text-black hover:text-green-700 text-base sm:text-lg font-bold">About Us</Link>
                        <Link to="/contactus" className="text-black hover:text-green-700 text-base sm:text-lg font-bold">Contact</Link>
                    </nav>

                    <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-normal mt-8 sm:mt-0">
                        <div className='flex items-center'>
                            <Link to="/jprofile">
                                <img src={profilePic} alt="Profile" className="rounded-full w-20 sm:w-20" />
                            </Link>
                        </div>
                    </div>
    
                    <div>
                        <LogoutButton/>
                    </div>


                </div>

                <div className="w-full px-4 sm:w-[1000px] sm:mx-auto lg:ml-[410px] mt-[150px] sm:mt-[250px] lg:mt-[350px]">

                    <p className="font-bold text-2xl sm:text-3xl text-center">
                        <span className="text-red-700 font-extrabold font-mono text-4xl sm:text-5xl">
                        1052
                        </span>{" "}
                        Jobs available
                    </p>

                    <br />

                    <p className="font-bold text-2xl sm:text-3xl text-center font-sans">
                        Craft Your Ideal Career Path
                    </p>

                    <br />

                    <p className="font-bold text-xs sm:text-sm text-center">
                        Discover amazing opportunities to shape your future. Explore countless
                        jobs on this platform.
                    </p>

                </div>


                <Footer/>

            </div>    

  )
}

export default Dashboard