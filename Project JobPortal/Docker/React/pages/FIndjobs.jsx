import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bodyimg } from '../images/index.jsx';
import Footer from '../components/Footer';
import JNav from '../components/JNav.jsx';




const Findjobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const fetchJobs = async () => {
            try {
                const response = await fetch("/api/viewjobs", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {

                    const data = await response.json();
                    setJobs(data.jobs);  // Expecting an array of jobs

                } else {
                    console.error("Failed to fetch jobs");
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

            <JNav/>

		    <p className="text-2xl font-bold text-center">Jobs</p>
		    
		    <br />

		    <div className="grid grid-cols-3 gap-y-4 bg-white py-12 px-[50px] rounded-3xl">
		    
		        {jobs.length > 0 ? (
		        
		            jobs.map((job) => (
		            
		                <div key={job._id} className="bg-zinc-300 w-[400px] px-4 py-4 border-2 border-black">
		                
		                    <div className="flex gap-20">
		                    
				                <div>
				                    <img src={`data:image/png;base64,${job.PostedBy?.Photo}`} alt="logo" className="w-12" />
				                </div>
				                
				                <div>
				                
				                    <p className="font-bold">{job.PostedBy?.CompanyName || "Company Name"}</p>
				                    <p className="text-sm">{job.Location || "Location not provided"}</p>
				                    
				                </div>
		                        
		                    </div>

		                    <div className="text-center my-12">
		                    
				                <p className="font-bold">{job.JobTitle}</p>
				                <p className="text-sm text-green-700">{job.JobType}</p>
		                        
		                    </div>

		                    <Link to={`/apply?jobId=${job._id}`}>
		                    
				                <button className="bg-red-700 text-white w-32 border-2 border-black mx-28 hover:bg-green-700">
				                    Apply Now
				                </button>
		                        
		                    </Link>
		                    
		                </div>
		                
		            ))
		            
		        ) : (
		            <p className="text-center w-full col-span-3 font-bold">No jobs available</p>
		        )}
		        
		    </div>

            <Footer/>
            
        </div>
    );
};

export default Findjobs;
