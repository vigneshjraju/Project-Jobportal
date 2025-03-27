import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JNav from "../components/JNav";
import Footer from "../components/Footer";
import { bodyimg } from "../images/index.jsx";

const Applyjob = () => {
    const [job, setJob] = useState(null);
    const [message, setMessage] = useState("");

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const jobId = searchParams.get("jobId"); // Extract jobId from query params

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`/api/getJobDetails?jobId=${jobId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setJob(data.job);
                } else {
                    console.error("Failed to fetch job details");
                }
            } catch (error) {
                console.error("Error fetching job details:", error);
            }
        };

        if (jobId) {
            fetchJobDetails();
        }
    }, [jobId]);

    const handleApply = async () => {
        try {

            const response = await fetch(`/api/apply?jobId=${jobId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }

            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Job application submitted successfully!");
            } 

            else {
                setMessage(data.message || "Error applying for the job");
            }

        } 
        
        catch (error) {
            console.error("Error applying for job:", error);
            setMessage("Internal Server Error");
        }
    };

    return (

        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

            <JNav/>

            <div className="bg-white py-12 mx-28 rounded-3xl">

                {job ? (
                    <>

                        


                                <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
                                
                                    <div>
                                        <img src={`data:image/png;base64,${job.PostedBy.Photo}`} alt="photo" className="w-36 rounded-full ml-[80px]" />
                                    </div>
                                    
                                    <div className="h-28 mt-[40px] ml-44">
                                    
                                        <p className="text-3xl font-bold">{job.JobTitle}</p>
                                        <p className="text-xl font-bold text-red-700 hover:text-green-700">
                                            {job.PostedBy?.CompanyName || "Company Name"}
                                        </p>
                                        <p>{job.Location}</p>
                                        
                                    </div>
                                    
                                    <div className="mt-20">
                                    
                                        <p className="text-xl font-bold">
                                            {job.Salary} <span className="text-sm">/monthly</span>
                                        </p>
                                        
                                    </div>
                                    
                                </div>

                                <div className="w-[800px] mx-[220px]">
                                
                                    <div>
                                    
                                        <p className="text-3xl font-bold">Description</p>
                                        <p className="border-2 border-zinc-300">{job.JobDescription}</p>
                                        
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
                                        <p className="border-2 border-zinc-300">Qualification: {job.Qualification}</p>
                                        
                                    </div>

                                    <button
                                        className="bg-red-700 text-white font-bold w-32 h-16 border-2 border-black mx-28 hover:bg-green-700"
                                        onClick={handleApply}
                                    >
                                        Apply Now
                                    </button>

                                    {message && <p className="text-center mt-4 font-bold">{message}</p>}
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

                                
                            </>
                        ) : (
                            <p className="text-center text-xl font-bold">Loading job details...</p>
                        )}
                    </div>

                <Footer/>          

        </div>        
    );
};

export default Applyjob;

    