import React, { useState, useEffect } from "react";
import ENav from "../components/ENav.jsx";
import Footer from "../components/Footer.jsx";
import { bodyimg } from "../images/index.jsx";
import { Link , useParams } from "react-router-dom";

const Jobreview = () => {

    const { jobId } = useParams();
    console.log("Extracted jobId:", jobId);  // Debugging

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [companyname,setCompanyname]=useState('');
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    const response = await fetch(`/api/employer/profile`);
    
                    if (response.ok) {
                        const data = await response.json();
                        
                        setCompanyname(data.Companyname || "");

                        if (data.photo) {
                            setPhotoFile(`data:image/jpeg;base64,${data.photo}`|| ""); // Set the fetched profile picture
                        }
                    }
                } catch (error) {
                    console.error("Error fetching companyname and photo:", error);
                }
            };
    
            fetchUserDetails();
        }, []);





    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/job/${jobId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}` // Include token
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch job details");
                }

                const jobData = await response.json();
                setJob(jobData); // Store full job object

            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [jobId]);



    if (loading) return <p className="text-center text-2xl">Loading...</p>;
    if (!job) return <p className="text-center text-2xl text-red-600">Job not found!</p>;



  return (

    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

        <ENav/>

            <div>
            <p className="text-2xl font-bold text-center">Job Posted</p>
            
            <br />
            
            <div className="bg-white py-12 mx-28 rounded-3xl">
            
                <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
                
                    <div>
                        <img src={photoFile} alt="photo" className="w-36 rounded-full ml-[80px]" />
                    </div>
                    
                    <div className="h-28 mt-[40px] ml-44">
                    
                        <p className="text-3xl font-bold">{job.JobTitle}</p>
                        
                        <p className="text-xl font-bold text-red-700 hover:text-green-700">
                        {companyname}
                        </p>
                        
                        <p>{job.Location}</p>
                        
                    </div>
                    
                    <div className="mt-20">
                        <p className="text-xl font-bold">{job.Salary}<span className="text-sm">/monthly</span></p>
                    </div>
                    
                    <div>
                        <Link to={`/jobedit/${job._id}`}>
                        
                            <button className="bg-red-700 text-white text-2xl w-44 mt-12 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-700">
                            Update
                            </button>
                        
                        </Link>
                        
                    </div>
                
                </div>
                
                <br />
                
                <div className="w-[800px] mx-[220px]">
                
                        <div>
                        
                            <p className="text-3xl font-bold">Description</p>
                            <p className="border-2 border-zinc-300">
                            {job.JobDescription}
                            </p>
                            
                        </div>
                        
                        <br />
                        <br />
                        
                        <div>
                        
                            <p className="text-3xl font-bold">Responsibilities</p>
                            <ul className="list-disc border-2 border-zinc-300">
                                {job.Responsibilities?.split("\n").map((resp, index) => (
                                <li key={index}>{resp}</li>
                                ))}
                            </ul>
                            
                        </div>
                        
                        <br />
                        <br />
                        
                        <div>
                        
                            <p className="text-3xl font-bold">Requirements</p>
                            <ul className="list-disc border-2 border-zinc-300">
                                {job.Requirements?.split("\n").map((req, index) => (
                                <li key={index}>{req}</li>
                                ))}
                            </ul>
                            
                        </div>
                        
                        <br />
                        <br />
                        
                        <div className="py-8">
                        
                            <p className="text-3xl font-bold">Educational Requirements</p>
                            <p className="border-2 border-zinc-300">
                            {job.Qualification}
                            </p>
                            
                        </div>
                
                </div>
                
                <div className="bg-zinc-300 w-[500px] px-8 py-8 rounded-3xl border-2 border-black absolute left-[1150px] top-[500px]">
                
                    <p className="text-3xl font-bold">Summary</p>
                    
                    <br />
                    <br />
                    
                    <div className="flex justify-between">
                    
                        <label className="font-bold text-lg w-52">Job Type</label>
                        <p className="flex-1">{job.JobType}</p>
                        
                    </div>

                    
                    <div className="flex justify-between">
                    
                        <label className="font-bold text-lg w-52">Posted</label>
                        <p className="flex-1">{new Date(job.createdAt).toLocaleDateString()}</p>
                        
                    </div>
                    
                    <div className="flex justify-between">
                    
                        <label className="font-bold text-lg w-52">Gender</label>
                        <p className="flex-1">{job.GenderPreference}</p>
                        
                    </div>
                    
                    <div className="flex justify-between">
                    
                        <label className="font-bold text-lg w-52">Qualification</label>
                        <p className="flex-1">{job.Qualification}</p>
                        
                    </div>
                    
                    <div className="flex justify-between">
                    
                        <label className="font-bold text-lg w-52">Application End</label>
                        <p className="flex-1">{job.EndDate}</p>
                        
                    </div>
                
                </div>
                
            </div>
            
            </div>

        <Footer/>

    </div>
  )
}

export default Jobreview