import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { bodyimg } from '../images/index.jsx';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import ENav from '../components/ENav.jsx';


const AppliedCandidates = () => {

    const [applicants, setApplicants] = useState([]);

    const [message, setMessage] = useState("");
    const location = useLocation();
    const [jobId, setJobId] = useState(""); // Store jobId in state

    // Extract jobId from URL query parameters
    
    useEffect(() => {
    
        const params = new URLSearchParams(location.search);
        const jobId = params.get("jobId");

        if (jobId) {

            setJobId(jobId); // Store jobId in state
            fetchApplicants(jobId);

        }
    }, [location.search]);

    // Function to fetch applicants for the given job
    
    const fetchApplicants = async (jobId) => {
    
        try {
        
            const response = await fetch(`/api/appliedcandidates?jobId=${jobId}`, {
            
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setApplicants(data.applicants);
                
            } 
            
            else {
                setMessage(data.message || "Error fetching applicants.");
            }
            
        } 
        
        catch (error) {
            console.error("Error fetching applicants:", error);
            setMessage("Internal Server Error.");
        }
        
    };

    return (
    
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

        	<ENav/>
    
            <div className="bg-white py-12 mx-28 rounded-3xl">
            
                    <p className="text-2xl font-bold text-center">Candidates</p>
                    <br />

                    {message && <p className="text-center text-red-700 font-bold">{message}</p>}

                    <div className="grid grid-cols-3 gap-y-4 bg-white py-12 px-[50px] mx-28 rounded-3xl">
                    
                        {applicants.length > 0 ? (
                        
                            applicants.map((candidate) => (
                            
                            <div key={candidate._id} className="bg-zinc-300 w-[350px] px-4 py-4 border-2 border-black">
                            
                                <div>
                                    <img src={`data:image/png;base64,${candidate.Photo}`} alt="logo" className="w-20 h-24 ml-[120px]" />
                                </div>

                                <div className="text-center">
                                
                                    <p className="font-bold text-2xl">{candidate.Name || "No Name"}</p>
                                    
                                </div>

                                {/* Status Display */}
                                    <p className={`text-center font-bold px-4 py-1 rounded-lg ${
                                        candidate.Status === "Shortlisted" ? "bg-green-500 text-white" :
                                        candidate.Status === "Pending" ? "bg-yellow-500 text-white" :
                                        candidate.Status === "Rejected" ? "bg-red-500 text-white" :
                                        "bg-gray-500 text-white" // Default if no status
                                    }`}>
                                        {candidate.Status}
                                    </p>





                                <Link to={`/candidateprofile/${candidate._id}/${jobId}`}>
                                
                                    <button className="bg-red-700 text-white w-32 border-2 border-black mx-24 hover:bg-green-700">
                                        View Profile
                                    </button>
                                    
                                </Link>

                                
                            </div>
                            
                            ))
                            
                        ) : (
                            <p className="text-center font-bold text-red-600">No applicants yet for this job.</p>
                        )}
                    
                    </div>
                
            </div>
		
	    	<Footer/>



    </div>	
        
    );
};

export default AppliedCandidates;
   