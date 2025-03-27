import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { bodyimg } from '../images/index.jsx';
import Footer from '../components/Footer';
import JNav from '../components/JNav.jsx';
import { call } from '../images/index.jsx';

const Jprofile = () => {
    
    const [profilePic, setProfilePic] = useState("images/Photo.jpeg"); // Default image

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // const fetchProfile = async () => {

        //     try {
        //         const token = localStorage.getItem('authtoken'); // Get stored JWT token

        //         const response = await fetch('/api/jobseeker/profile', {
        //             method: "GET",
        //             headers: {
        //                 Authorization: `Bearer ${token}`, // Send authtoken
        //                 "Content-Type": "application/json",
        //             },
        //         });
                
        //         const data = await response.json();
        //         console.log(data);

        //         if (data.photo) {
        //             setProfilePic(`data:image/jpeg;base64,${data.photo}`); // Set the fetched profile picture
        //         }
                
        //         setProfile(data);
        //         setLoading(false);


        //     } catch (err) {
        //         setError('Failed to fetch profile');
        //         setLoading(false);
        //     }
        // };

        fetchProfile();
        fetchNotifications();
    }, []);


    const fetchProfile = async () => {

        try {
            const token = localStorage.getItem('authtoken'); // Get stored JWT token

            const response = await fetch('/api/jobseeker/profile', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // Send authtoken
                    "Content-Type": "application/json",
                },
            });
            
            const data = await response.json();
            console.log(data);

            if (data.photo) {
                setProfilePic(`data:image/jpeg;base64,${data.photo}`); // Set the fetched profile picture
            }
            
            setProfile(data);
            setLoading(false);


        } catch (err) {
            setError('Failed to fetch profile');
            setLoading(false);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await fetch("/api/jobseeker/notifications", {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
                },
            });

            const data = await response.json();

            if (response.ok) {
                setNotifications(data.notifications);
            } else {
                setMessage(data.message || "Error fetching notifications.");
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
            setMessage("Internal Server Error.");
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;








    return (

        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-center bg-cover dark:bg-gray-900">

            <JNav/>    

                    <div>
                    <p className="text-2xl font-bold text-center">Profile</p>
                    <br />

                    <div className="bg-white py-12 mx-28 rounded-3xl">
                        <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
                            <div>
                                <img 
                                    src={profilePic}
                                    alt="profile" 
                                    className="w-36 rounded-full ml-[80px]"
                                />
                            </div>

                            <div className="h-28 mt-[40px] ml-44">
                                <p className="text-5xl font-bold">{profile.name}</p>
                                <p className="text-xl font-bold text-red-700">Industrial Engineer</p>
                                <div className="flex">
                                    <img src={call} alt="phone" className="w-4" />
                                    <p className='ml-[10px]'>{profile.phone}</p>
                                </div>
                            </div>

                            <div className="flex gap-8 mt-20">
                                <div>
                                    <Link to='/jedit'><button className="bg-red-700 text-white text-2xl w-44 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-700">Update</button></Link>
                                </div>

                                <div>
                                    {message && <p className="text-red-600 font-bold">{message}</p>}

                                    <select className="bg-red-700 text-white text-2xl w-44 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-200 hover:text-black"
                                    defaultValue="" >

                                        <option value="" disabled >
                                            Notifications
                                        </option>

                                        {notifications.length > 0 ? (

                                            notifications.map((notif) => (

                                                <option key={notif._id} value={notif.JobID?._id}>
                                                    {notif.JobID?.JobTitle} - {notif.JobID?.PostedBy?.CompanyName} - {notif.Status}
                                                </option>

                                            ))
                                        ) : (
                                            <option disabled>No notifications available</option>
                                        )}
                                    </select>
                                </div>
                            </div>


                        </div>

                        <br />

                        <div className="w-full md:w-[800px] mx-auto md:mx-[220px]">
                            <div>  
                                <p className="text-3xl font-bold">About Candidate</p>
                                <p>{profile.about}</p>
                            </div>  
                            
                            <br/><br/>

                             

                            <div>  
                                <p className="text-3xl font-bold">Education</p>

                                {profile.education && profile.education.length > 0 ? (
                                    <div className="flex flex-col gap-4 border-2 border-black p-4 rounded-lg">

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Qualification</label>
                                            <p className="flex-1">{profile.education[0].Qualification}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">College</label>
                                            <p className="flex-1">{profile.education[0].College}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">University</label>
                                            <p className="flex-1">{profile.education[0].University}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Grade</label>
                                            <p className="flex-1">{profile.education[0].Grade}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No education details available</p>
                                )}


                            </div>

                            <br />

                            
                            <div>
                                <p className="text-3xl font-bold">Experience</p>

                                {profile.experience && profile.experience.length > 0 ? (
                                    <div className="flex flex-col gap-4 border-2 border-black p-4 rounded-lg">

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Job Title</label>
                                            <p className="flex-1">{profile.experience[0].JobTitle}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Company</label>
                                            <p className="flex-1">{profile.experience[0].Company}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Details</label>
                                            <p className="flex-1">{profile.experience[0].Details}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Years</label>
                                            <p className="flex-1">{profile.experience[0].Years}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No experience details available</p>
                                )}
                            </div>


                            <br />
                            <br />
                            <div>
                                            <p className="font-bold text-3xl">Skills</p>

                                            <br />

                                            <p className="flex-1 border-2 border-black rounded-lg">{profile.skills}</p>
                                            
                            </div>

                        </div>
        
                                <div class="relative md:absolute md:left-[1150px] md:top-[550px] w-full md:w-[500px] mt-8 md:mt-0 mx-4 md:mx-0">      
                                
                                    <div className="bg-zinc-300 w-[500px] px-8 py-8 rounded-3xl border-2 border-black">

                                        <p className="text-3xl font-bold">Information</p> 
                                        <div className="flex justify-between">
                                            <label className="font-bold text-lg w-52">Age</label>
                                            <p className="flex-1">{profile.age}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold text-lg w-52">Gender</label>
                                            <p className="flex-1">{profile.gender}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold text-lg w-52">Higher Qualification</label>
                                            <p className="flex-1">{profile.higherqualification}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <label className="font-bold text-lg w-52">Languages</label>
                                            <p className="flex-1">{profile.languages}</p>
                                        </div>

                                        
                                    </div>
                                </div>



                    </div>
                </div>

                <Footer/>

        </div>

        
    );
};

export default Jprofile;