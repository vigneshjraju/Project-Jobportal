import React, { useEffect, useState } from 'react';
import { bodyimg } from '../../images/index.jsx';
import Footer from '../../components/Footer.jsx';
import ANav from '../../components/ANav.jsx';
import {useParams, useNavigate } from "react-router-dom"

const Employerdelete = () => {

    const { id } = useParams(); // Get employer ID from the URL
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);


    // Fetch Employer Details
    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const response = await fetch(`/api/employ/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Make sure this is set
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data.Employ);
                } else {
                    console.error("Failed to fetch employer details.");
                }
            } catch (error) {
                console.error("Error fetching employer:", error);
            }
        };

        fetchEmployer();
    }, [id]);

    // Delete Employer
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this employer?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/admin/deleteemployers/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.ok) {
                alert("Employer deleted successfully");
                navigate("/Adashboard"); // Redirect after deletion
            } else {
                const data = await response.json();
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error deleting employer:", error);
            alert("An error occurred while deleting the employer.");
        }
    };

    if (!profile) {
        return <p>Loading...</p>;
    }




  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

        <ANav/>

            <p className="text-2xl font-bold text-center">Employer Profile</p>
      
            <br />
      
            <div className="bg-white py-12 mx-28 rounded-3xl">
      
                  <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
        
                      <div>
                        <img 
                        src={`data:image/jpeg;base64,${profile.Photo}`} 
                        alt="photo" 
                        className="w-36 rounded-full ml-[80px]" 
                        />
                      </div>
          
                      <div className="h-28 mt-[40px] ml-44">
                      
                        <p className="text-3xl font-bold text-red-700">{profile.CompanyName}</p>
                        <p>{profile.Location}</p>
                        
                      </div>
          
		                  <div className="mt-12 flex gap-8">
		  
				            
				            
                            <button
                            className="bg-red-700 text-white font-bold text-xl w-44 h-12 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-700"
                            onClick={handleDelete}
                            >
                                Delete Employer
                            </button>
				              
				            
				            
				 
		    
		                  </div>
          
                  </div>
        
                  <br />
        
                  <div className="w-[800px] mx-[220px]">
        
                        <div>
                        
                            <p className="text-3xl font-bold">About Employers</p>
                            <p>
                            {profile.AboutCompany}
                            </p>
                          
                        </div>
          
		                    <br /><br />
		  
             
          
                  </div>
        
            </div>

            <div className="bg-zinc-300 w-[500px] px-8 py-8 rounded-3xl border-2 border-black absolute left-[1150px] top-[550px]">
                                <p className="text-3xl font-bold">Information</p> 
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Since</label>
                                    <p className="flex-1">{profile.Since}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Total Jobs</label>
                                    <p className="flex-1">{profile.TotalJobs}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Location</label>
                                    <p className="flex-1">{profile.Location}</p>
                                </div>

                                {/* Add other info fields */}
              </div>
        



        <Footer/>



    </div>
  )
}

export default Employerdelete