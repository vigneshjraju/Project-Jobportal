import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navw from "../components/Navw.jsx";
import Footer from "../components/Footer.jsx";
import { bodyimg } from "../images/index.jsx";

const JobSeekerDetails = () => {
    
    const { userId } = useParams();
    const navigate = useNavigate();
    
    // Form state
    const[Name,setName]=useState("");
    const [about, setAbout] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [higherqualification, setHigherqualification] = useState("");
    const [educationQualification, setEducationQualification] = useState("");
    const [educationCollege, setEducationCollege] = useState("");
    const [educationUniversity, setEducationUniversity] = useState("");
    const [educationGrade, setEducationGrade] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [details, setDetails] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [skills, setSkills] = useState("");
    const [languages, setLanguages] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("name", Name);
        formData.append("phonenumber", phone);
        formData.append("age", age);
        formData.append("gender", gender);
        formData.append("about", about);
        formData.append("higherqualification", higherqualification);
        formData.append("education", 
            `Qualification: ${educationQualification}, ` +
            `College: ${educationCollege}, ` +
            `University: ${educationUniversity}, ` +
            `Grade: ${educationGrade}`
        );
        formData.append("experience", 
            `Job Title: ${jobTitle}, ` +
            `Company: ${companyName}, ` +
            `Details: ${details}, ` +
            `Years: ${experienceYears}`
        );
        formData.append("skills", skills);
        formData.append("languages", languages);

        if (photoFile) formData.append("photo", photoFile);
        if (resumeFile) formData.append("resume", resumeFile);

        try {
            const response = await fetch(`/api/signup/details/${userId}`, {
                method: "PATCH",
                body: formData,
            });

            if (response.ok) {
                navigate("/login");
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (

        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">
            
            <Navw/>

                <div className="ml-[550px] my-20 bg-zinc-300 border-2 border-black w-[800px] py-12 rounded-xl shadow-sm shadow-black">
                    <form onSubmit={handleSubmit}>
                        <div className="border-b-2 w-[700px] ml-[50px]">
                            <p className="text-black font-extrabold text-2xl font-serif text-center">
                                Job Seeker Profile
                            </p>
                        </div>

                        <br />

                        <div className="pl-20 flex flex-col w-[600px]">
                            
                            {/* Name Section */}
                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-40">Name</p>
                                <input 
                                    type="text" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Name"
                                    value={Name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                            <br />
                            
                            {/* About Section */}
                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-40">About Candidate</p>
                                <textarea 
                                    placeholder="About Yourself" 
                                    className="flex-1 border-2 border-black" 
                                    value={about} 
                                    onChange={(e) => setAbout(e.target.value)}
                                    required 
                                />
                            </div>
                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">Age</label>
                                <input 
                                    type="number" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required 
                                />
                            </div>
                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">Gender</label>
                                <input 
                                    type="text" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required 
                                />
                            </div>
                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">Phone Number</label>
                                <input 
                                    type="number" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required 
                                />
                            </div>
                            <br />

                            {/* Education Section */}

                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-40">Higher Qualification</p>
                                <input 
                                    type="text" 
                                    className="flex-1 border-2 border-black"
                                    value={higherqualification}
                                    onChange={(e) => setHigherqualification(e.target.value)}
                                    required 
                                />
                            </div>



                            <br />
                            <div>
                                <p className="font-bold text-xl ml-[260px]">Education</p>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Qualification</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Qualification"
                                        value={educationQualification}
                                        onChange={(e) => setEducationQualification(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">College</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter College"
                                        value={educationCollege}
                                        onChange={(e) => setEducationCollege(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">University</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter University"
                                        value={educationUniversity}
                                        onChange={(e) => setEducationUniversity(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Grade</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Grade"
                                        value={educationGrade}
                                        onChange={(e) => setEducationGrade(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <br />

                            {/* Experience Section */}
                            <div>
                                <p className="font-bold text-xl ml-[230px]">Work & Experience</p>
                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Job Title</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Job Title"
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Company Name</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Company Name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Details</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Details"
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        required 
                                    />
                                </div>
                                <br />

                                <div className="flex justify-between">
                                    <label className="font-semibold text-lg w-40">Experience (Years)</label>
                                    <input 
                                        type="text" 
                                        className="flex-1 border-2 border-black"
                                        placeholder="Enter Experience"
                                        value={experienceYears}
                                        onChange={(e) => setExperienceYears(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <br />

                            {/* File Uploads */}
                            <div className="flex justify-between">
                                <label className="font-semibold text-lg w-40">Photo Upload:</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="bg-red-700 flex-1 border-2 border-black text-white"
                                    onChange={(e) => setPhotoFile(e.target.files[0])}
                                />
                            </div>
                            <br />

                            <div className="flex justify-between">
                                <label className="font-semibold text-lg w-40">Resume Upload:</label>
                                <input 
                                    type="file" 
                                    accept=".pdf,.doc"
                                    className="bg-red-700 flex-1 border-2 border-black text-white"
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />
                            </div>
                            <br />

                            {/* Skills */}
                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-40">Skills</p>
                                <input 
                                    type="text" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Skills"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    required 
                                />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-40">Languages</p>
                                <input 
                                    type="text" 
                                    className="flex-1 border-2 border-black"
                                    placeholder="Enter Languages"
                                    value={languages}
                                    onChange={(e) => setLanguages(e.target.value)}
                                    required 
                                />
                            </div>

                            <br />

                            <button 
                                type="submit" 
                                className="bg-red-700 text-white w-56 mx-[200px] font-bold text-xl border-2 border-black rounded-xl hover:bg-green-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            <Footer/>

            
        </div>     


    );
};

export default JobSeekerDetails;
