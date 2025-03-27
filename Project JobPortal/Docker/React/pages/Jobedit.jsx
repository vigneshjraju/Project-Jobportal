import React, { useState, useEffect } from "react";
import ENav from '../components/ENav.jsx';
import Footer from '../components/Footer.jsx';
import { bodyimg } from '../images/index.jsx';
import { useNavigate , useParams } from "react-router-dom";

const Jobedit = () => {

    const navigate = useNavigate();
    const { jobId } = useParams();

    const [Jobtitle, setJobtitle]   = useState('');
    const [Jobtype, setJobtype]   = useState('');
    const [Location,setLocation]=useState('');
    const [Genderpreferenece, setGenderpreference]   = useState('');
    const [Jobdescription, setJobdescription]   = useState('');
    const [Responsibilities, setResponsibilities]   = useState('');
    const [Requirements, setRequirements]   = useState('');
    const [Qualification, setQualification] = useState('');
    const [Salary, setSalary]   = useState('');
    const [Enddate, setEnddate] = useState('');
    const [Postedby,setPostedBy]=useState('');

    const [error, setError]         = useState('');

    useEffect(() => {
            const fetchJobDetails = async () => {
                try {

                    const response = await fetch(`/api/job/${jobId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}` // Include token if needed
                        }
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        
                        setJobtitle(data.JobTitle || "");
                        setJobtype(data.JobType || "");
                        setGenderpreference(data.GenderPreference || "");
                        setJobdescription(data.JobDescription || "");
                        setResponsibilities(data.Responsibilities || "");
                        setRequirements(data.Requirements || "");
                        setQualification(data.Qualification || "");
                        setSalary(data.salary || "");
                        setEnddate(data.EndDate || "");
                        setPostedBy(data.PostedBy || "");
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                }
            };
    
            fetchJobDetails();
        },[jobId]);

        const handleSignup = async (e) =>{
            e.preventDefault();
            try{
                const response = await fetch(`/api/editjob/${jobId}`,{
                    method:'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({

                        jobtitle: Jobtitle,
                        jobtype: Jobtype,
                        location: Location,
                        genderpreferenece: Genderpreferenece,
                        jobdescription: Jobdescription,
                        responsibilities:  Responsibilities,
                        requirements: Requirements,
                        qualification:  Qualification,
                        salary: Salary,
                        enddate:Enddate
                    }),
                });
    
                if(!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || 'Job editing failed');
                }
    
                if (response.ok) {
                    const responseData = await response.json();
                    
                    console.log("Job edited Successfully:", responseData);
                    setPostedBy(responseData.Job.PostedBy); // Save the user ID
        
                    alert("Job edited successfully!");

                    navigate(`/jobreview/${responseData.Job._id}`);

                } else {
                    alert("Error posting job");
                }
    
               
            
            
            } catch(err) {
                setError(err.message || 'Posting failed: Please try again!')
            }
        };

  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

            <ENav/>

            <div className="ml-[550px] my-20 bg-zinc-300 border-2 border-black w-[800px] py-12 rounded-xl shadow-sm shadow-black">

                {error && <p className='text-red-500 mb-4'>{error}</p>}

                <form onSubmit={handleSignup}>

                        <div className="border-b-2 w-[700px] ml-[50px]">
                        <p className="text-black font-extrabold text-2xl font-serif text-center">Post a Job</p>
                        </div>

                        <br />

                        <div className="flex flex-col gap-4 w-[500px] mx-[150px]">
                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">Enter Job Title</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black"
                                value={Jobtitle}
                                onChange={(e) => setJobtitle(e.target.value)} 
                                placeholder="Enter Job Title" 
                                required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                
                                <label className="font-bold text-lg w-40">Job Type</label>
                                
                                <input 
                                type="text"
                                className="flex-1 border-2 border-black"
                                value={Jobtype}
                                onChange={(e) => setJobtype(e.target.value)} 
                                />

                            </div>

                            

                            <br />

                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">Location</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black"
                                value={Location} 
                                onChange={(e) => setLocation(e.target.value)} 
                                placeholder="Enter Location" 
                                required />
                            </div>

                            <br />
            


                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">Gender Preference</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black"
                                value={Genderpreferenece} 
                                onChange={(e) => setGenderpreference(e.target.value)} 
                                placeholder="Enter Educational Qualification" 
                                required />
                            </div>

                            <br />

                            <div className="flex flex-col">
                                <label className="font-bold text-lg">Job Description</label>
                                <textarea 
                                className="border-2 border-black p-2" 
                                placeholder="Enter Job Description"
                                value={Jobdescription} 
                                onChange={(e) => setJobdescription(e.target.value)} 
                                required
                                >
                                </textarea>

                            </div>

                            <br />

                            <div className="flex flex-col">
                                <label className="font-bold text-lg">Responsibilities</label>
                                <textarea 
                                className="border-2 border-black p-2" 
                                placeholder="Enter Responsibilities" 
                                value={Responsibilities} 
                                onChange={(e) => setResponsibilities(e.target.value)}
                                required
                                >
                                </textarea>
                            </div>

                            <br />

                            <div className="flex flex-col">
                                <label className="font-bold text-lg">Requirements</label>
                                <textarea 
                                className="border-2 border-black p-2" 
                                placeholder="Enter Requirements"
                                value={Requirements} 
                                onChange={(e) => setRequirements(e.target.value)} 
                                required
                                >                             
                                </textarea>
                            </div>

                            <br />



                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">Educational Qualification</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black" 
                                value={Qualification}
                                onChange={(e) => setQualification(e.target.value)} 
                                placeholder="Enter Educational Qualification" 
                                required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">Salary/month</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black" 
                                value={Salary}
                                onChange={(e) => setSalary(e.target.value)} 
                                placeholder="Enter Salary" 
                                required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="font-bold text-lg w-40">EndDate</label>
                                <input 
                                type="text" 
                                className="flex-1 border-2 border-black" 
                                value={Enddate}
                                onChange={(e) => setEnddate(e.target.value)}
                                />
                            </div>

                            <br />
                            <br />

                            <button type="submit" className="bg-red-700 text-white w-56 mx-[150px] font-bold text-xl border-2 border-black rounded-xl hover:bg-green-700">
                                Submit
                            </button>

                        </div>

                </form>

                

            </div>

            <Footer/>

    </div>
  )
}

export default Jobedit