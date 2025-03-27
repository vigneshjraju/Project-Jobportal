import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Joblist = () => {
    const [jobs, setJobs] = useState([]);

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
    
        const fetchCompanyJobs = async () => {
        
            try {
                const response = await fetch("/api/employer/viewjobs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setJobs(data.jobs);  // Expecting an array of jobs from the backend
                } 
                
                else {
                    console.error("Failed to fetch jobs");
                }
                
            }
             catch (error) {
                console.error("Error fetching company jobs:", error);
            }
        };

        fetchCompanyJobs();
    }, []);

    return (
        <div className="grid grid-cols-2 gap-y-4 gap-x-4 bg-white py-4 rounded-3xl">
        
            {jobs.length > 0 ? (
            
                jobs.map((job) => (
                
                    <div key={job._id} className="bg-zinc-300 w-[400px] px-4 py-4 border-2 border-black">
                    
		                <div className="flex gap-20">
		                
				            <div>
				                <img src={photoFile} alt="logo" className="w-12" />
				            </div>
				            
				            <div>
				                <p className="font-bold">{companyname || "Your Company"}</p>
				                <p className="text-sm">{job.Location}</p>
				            </div>
		                    
		                </div>

		                <div className="text-center my-12">
		                
				            <p className="font-bold">{job.JobTitle}</p>
				            <p className="text-sm text-green-700">{job.JobType}</p>
		                    
		                </div>
                        

		                <div className="flex gap-8">
		                
				            <Link to={`/jobedit/${job._id}`}>
				            
				                <button className="bg-red-700 text-white w-32 border-2 border-black hover:bg-green-700">
				                    Update
				                </button>
				                
				            </Link>
		                    
				            <Link to={`/appliedcandidates?jobId=${job._id}`}>
				            
				                <button className="bg-red-700 text-white w-48 border-2 border-black hover:bg-green-700">
				                    Applied Candidates
				                </button>
				                
				            </Link>
		                    
		                </div>
                        
                    </div>
                    
                ))
                
            ) : (
                <p className="text-center w-full col-span-2 font-bold">No jobs found</p>
            )}
            
        </div>
    );
};

export default Joblist;