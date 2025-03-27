import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bodyimg } from '../images/index.jsx';
import Footer from '../components/Footer';
import ENav from '../components/ENav.jsx';
import { call } from '../images/index.jsx';


const CandidateProfile = () => {
    const { id } = useParams(); // Get candidate ID from URL
    const {jobId} = useParams(); // Get the Job ID dynamically based on the current job

    const [candidate, setCandidate] = useState(null);
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCandidate = async () => {
            try {
                const response = await fetch(`/api/candidateprofile/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCandidate(data);
                    setResume(data.resume); // Store the resume link

                } else {
                    setError("Failed to fetch candidate details");
                }
            } catch (error) {
                console.error("Error fetching candidate:", error);
                setError("Internal Server Error");
            }
        };

        fetchCandidate();
    }, [id]);

    if (error) return <p className="text-center text-red-700">{error}</p>;
    if (!candidate) return <p className="text-center">Loading...</p>;


    const updateStatus = async (status) => {
        try {
            const response = await fetch("/api/employer/updatestatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ 
                    jobId:jobId, 
                    jobseekerId: id, 
                    status 
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Candidate status updated to: ${status}`);
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Internal Server Error");
        }
    };





    return (
        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

            <ENav/>    

                <div>
                    <p className="text-2xl font-bold text-center">Profile</p>
                    <br />

                    <div className="bg-white py-12 mx-28 rounded-3xl">
                        <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
                            <div>
                                <img 
                                    src={`data:image/jpeg;base64,${candidate.photo}`}
                                    alt="profile" 
                                    className="w-36 rounded-full ml-[80px]"
                                />
                            </div>

                            <div className="h-28 mt-[40px] ml-44">
                                <p className="text-5xl font-bold">{candidate.name}</p>
                                <p className="text-xl font-bold text-red-700">Industrial Engineer</p>
                                <div className="flex">
                                    <img src={call} alt="phone" className="w-4" />
                                    <p className='ml-[10px]'>{candidate.phone}</p>
                                </div>
                            </div>

                            <div className="flex gap-8 mt-20">
                            
                                <button 
                                    className="bg-green-700 text-white text-2xl w-32 h-12 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-800"
                                    onClick={() => updateStatus("Shortlisted")}
                                >
                                    Short List
                                </button>

                                <button 
                                    className="bg-yellow-700 text-white text-2xl w-32 h-12 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-yellow-800"
                                    onClick={() => updateStatus("Pending")}
                                >
                                    Pending
                                </button>

                                <button 
                                    className="bg-red-700 text-white text-2xl w-32 h-12 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-red-800"
                                    onClick={() => updateStatus("Rejected")}
                                >
                                    Reject
                                </button>
        
                                
                            </div>


                        </div>

                        <br />

                        <div className="w-[800px] mx-[220px]">
                            <div>  
                                <p className="text-3xl font-bold">About Candidate</p>
                                <p>{candidate.about}</p>
                            </div>  
                            
                            <br/><br/>

                             {/* Education Section */}

                            <div>  
                                <p className="text-3xl font-bold">Education</p>

                                {candidate.education && candidate.education.length > 0 ? (
                                    <div className="border-2 border-black p-4 rounded-lg">
                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Qualification</label>
                                            <p className="flex-1">{candidate.education[0].Qualification}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">College</label>
                                            <p className="flex-1">{candidate.education[0].College}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">University</label>
                                            <p className="flex-1">{candidate.education[0].University}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Grade</label>
                                            <p className="flex-1">{candidate.education[0].Grade}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No education details available</p>
                                )}


                            </div>

                            <br />

                            {/* Experience Section */}
                            <div className="mt-6">
                                <p className="text-3xl font-bold">Experience</p>

                                {candidate.experience && candidate.experience.length > 0 ? (
                                    <div className="border-2 border-black p-4 rounded-lg">
                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Job Title</label>
                                            <p className="flex-1">{candidate.experience[0].JobTitle}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Company</label>
                                            <p className="flex-1">{candidate.experience[0].Company}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Details</label>
                                            <p className="flex-1">{candidate.experience[0].Details}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <label className="font-semibold text-lg w-40">Years</label>
                                            <p className="flex-1">{candidate.experience[0].Years}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p>No experience details available</p>
                                )}
                            </div>


                            <br />
        

                            {/* Repeat for experience and skills */}
                            <div className="bg-zinc-300 w-[500px] px-8 py-8 rounded-3xl border-2 border-black absolute left-[1150px] top-[550px]">
                                <p className="text-3xl font-bold">Information</p> 
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Age</label>
                                    <p className="flex-1">{candidate.age}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Gender</label>
                                    <p className="flex-1">{candidate.age}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Higher Qualification</label>
                                    <p className="flex-1">{candidate.higherqualification}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Languages</label>
                                    <p className="flex-1">{candidate.languages}</p>
                                </div>

                                {/* Add other info fields */}
                            </div>

                            <div>
                                            <p className="font-bold text-3xl w-40">Skills</p>

                                            <br />

                                            <p className="flex-1 border-2 border-black rounded-lg py-4 px-4">{candidate.skills}</p>
                                            
                            </div>

                            <div className="mt-6">
                                <p className="text-3xl font-bold">Resume</p>

                                {candidate.resume ? (
                                    <iframe 
                                    src={`data:application/pdf;base64,${candidate.resume}`} 
                                    width="100%" 
                                    height="500px"
                                    />
                                ) : (
                                    <p>No resume uploaded</p>
                                )}
                            </div>



                        </div>
                    </div>
                </div>

                <Footer/>

        </div>

    );
};

export default CandidateProfile;
